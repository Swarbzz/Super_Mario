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

    mario.draw = function drawMarion(context) {
      sprite.draw('idle', context, 0, 0);
    }
    return mario;
  });
}