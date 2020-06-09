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

class Vec2 {
  constructor(x, y) {
    this.set(x, y)
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
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

  const gravity = 0.5;

  const mario = new Entity();
  mario.pos.set(64, 180);
  mario.vel.set(2, -10);

  mario.update = function updateMarion() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  const spriteLayer = createSpriteLayer(marioSprite, mario.pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context)
    mario.update();
    mario.vel.y += gravity; // adding gravity
    requestAnimationFrame(update);
  }
  update();
});