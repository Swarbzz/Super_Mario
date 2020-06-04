import {loadLevel} from './Loaders.js';
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) { //width of the sky
      for (let y = y1; y < y2; ++ y) { // length of the sky
        sprites.drawTile(background.tile, context, x, y); //this line determines where it should be displayed on the page
      }
    }  
  });
}
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

class Compositor {
  constructor() {
    this.layers = [];
  }
  draw(context) {
    this.layers.forEach(layer => {
      layer(context); //layer is a function that draws on the context
    });
  }
}

function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach(background => {
    drawBackground(background, buffer.getContext('2d'), sprites); //selects the tiles in 1-1.json via the arrays and displays them
  });
  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    sprite.draw('idle', context, pos.x, pos.y);
  }
}

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([marioSprite,sprites,level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context)
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }
  update();
});