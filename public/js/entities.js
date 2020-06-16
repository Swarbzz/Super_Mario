import Entity from './entity.js';
import Jump from './traits/jump.js';
import Velocity from './traits/Velocity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
  return loadMarioSprite()
  .then(sprite => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function drawMarion(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    }
    return mario;
  });
}