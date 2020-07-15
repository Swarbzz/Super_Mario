import Entity from './entity.js';
import Jump from './traits/jump.js';
import Go from './traits/go.js';
import {loadSpriteSheet} from './Loaders.js';

export function createMario() {
  return loadSpriteSheet('mario')
  .then(sprite => {
    const mario = new Entity();
    mario.size.set(14, 14);

    mario.addTrait(new Go());
    mario.addTrait(new Jump()); // jumps needs to be before velocity or mario will fall into the ground

    const frames = ['run-1', 'run-2', 'run-3'];

    function routeFrame(mario) {
      if (mario.go.direction !== 0) {
        return "run-1"
      }
      return 'idle';
    }

    mario.draw = function drawMarion(context) {
      sprite.draw(routeFrame(this), context, 0, 0);
    }
    return mario;
  });
}