import Timer from './timer.js';
import Camera from './camera.js';
import {loadLevel} from './Loaders.js';
import {createMario} from './entities.js';
import {setUpKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js'
import {setupMouseControl} from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  createMario(),
  loadLevel('1-1'),
])
.then(([mario, level]) => {
  mario.pos.set(64, 64); // change his position

  const camera = new Camera();
  window.camera = camera;

  createCollisionLayer(level); 

  level.entities.add(mario);

  level.comp.layers.push(createCollisionLayer(level));

  const input = setUpKeyboard(mario);

  input.listenTo(window);

  setupMouseControl(canvas, mario, camera);

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime)
    level.comp.draw(context, camera)
  }
  timer.start();
});