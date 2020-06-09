import Compositor from './compsitor.js';
import {loadLevel} from './Loaders.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
    }
}

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const gravity = 0.5;

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context)
    mario.update();
    mario.vel.y += gravity; // adding gravity
    requestAnimationFrame(update);
  }
  update();
});