import Timer from './timer.js';
import {loadLevel} from './Loaders.js';
import {createMario} from './entities.js';
import Keyboard from './keyboardState.js';
import {createCollisionLayer} from './layers.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  createMario(),
  loadLevel('1-1'),
])
.then(([mario, level]) => {

  const gravity = 2000; // change the gravity
  mario.pos.set(64, 64); // change his position

  createCollisionLayer(level); 

  level.entities.add(mario);

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

  ['mousedown', 'mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        mario.vel.set(0, 0);
        mario.pos.set(event.offsetX, event.offsetY); // this allows me to move mario with a click and drag off my mouse
      }
    })
  })

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime)
    level.comp.draw(context)
    mario.vel.y += gravity * deltaTime;
  }
  timer.start();
});