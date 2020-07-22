import Timer from './timer.js';
import Camera from './camera.js';
import {loadLevel} from './Loaders.js';
import {createMario} from './entities.js';
import {setUpKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  createMario(),
  loadLevel('1-1'),
])
.then(([mario, level]) => {
  const camera = new Camera();
  window.camera = camera;

  mario.pos.set(64, 64); // change his position

  level.entities.add(mario);
  const input = setUpKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime)

    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100
    }

    level.comp.draw(context, camera)
  }
  timer.start();
});