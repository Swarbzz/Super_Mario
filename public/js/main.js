import Compositor from './compsitor.js';
import Timer from './timer.js';
import {loadLevel} from './Loaders.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import Keyboard from './keyboardState.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer); //adds background

  const gravity = 2000;
  mario.pos.set(64, 180);

  const SPACE = 32; // 32 is spacebar, not downward arrow, my bad
  const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    console.log(keyState);
  });
  input.listenTo(window);

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    mario.update(deltaTime)
    comp.draw(context)
    mario.vel.y += gravity * deltaTime;
  }
  timer.start();
});