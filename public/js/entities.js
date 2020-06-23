import Entity from './entity.js';
import Jump from './traits/jump.js';
import Velocity from './traits/Velocity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
  return loadMarioSprite()
  .then(sprite => {
    const mario = new Entity();

    mario.addTrait(new Jump()); // jumps needs to be before velocity or mario will fall into the ground
    mario.addTrait(new Velocity());

    mario.draw = function drawMarion(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    }
    return mario;
  });
}