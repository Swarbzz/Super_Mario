import Compositor from './compsitor.js';
import {loadLevel} from './Loaders.js';
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js';
import {createBackgroundLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

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
.then(([marioSprite, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
  };

  const vel = {
    x: 2,
    y: -10,
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context)
    pos.x += vel.x;
    pos.y += vel.y;
    requestAnimationFrame(update);
  }
  update();
});