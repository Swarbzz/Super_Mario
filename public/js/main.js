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

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([marioSprite,sprites,level]) => {
  const backgroundBuffer = document.createElement('canvas');
  backgroundBuffer.width = 256;
  backgroundBuffer.height = 240;

  level.backgrounds.forEach(background => {
    drawBackground(background, backgroundBuffer.getContext('2d'), sprites); //selects the tiles in 1-1.json via the arrays and displays them
  });

  const pos = {
    x: 64,
    y: 64,
  };

  function update() {
    context.drawImage(backgroundBuffer, 0, 0);
    marioSprite.draw('idle', context, pos.x, pos.y);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }
  update();
});