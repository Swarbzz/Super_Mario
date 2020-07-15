import Entity from './entity.js';
import Jump from './traits/jump.js';
import Go from './traits/go.js';
import {loadSpriteSheet} from './Loaders.js';
import {createAnim} from './anim.js'

export function createMario() {
  return loadSpriteSheet('mario')
  .then(sprite => {
    const mario = new Entity();
    mario.size.set(14, 14);

    mario.addTrait(new Go());
    mario.addTrait(new Jump()); // jumps needs to be before velocity or mario will fall into the ground

    const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

    function routeFrame(mario) { 
      if (mario.go.direction !== 0) {
        return runAnim(mario.go.distance); // mario running animation!
      }
      return 'idle';
    }

    mario.draw = function drawMarion(context) {
      sprite.draw(routeFrame(this), context, 0, 0);
    }
    return mario;
  });
}