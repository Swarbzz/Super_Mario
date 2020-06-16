import Timer from './timer.js';
import {loadLevel} from './Loaders.js';
import {createMario} from './entities.js';
import Keyboard from './keyboardState.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  createMario(),
  loadLevel('1-1'),
])
.then(([mario, level]) => {

  const gravity = 2000; // change the gravity
  mario.pos.set(64, 180); // change his position

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

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    mario.update(deltaTime)
    level.comp.draw(context)
    mario.vel.y += gravity * deltaTime;
  }
  timer.start();
});