import {Trait} from '../entity.js';

export default class Go extends Trait {
  constructor() {
    super('go');
    this.direction = 0; 
    this.speed = 7000; 

    this.distance = 0;
  }
    
  update(entity, deltaTime) {
      entity.vel.x = this.speed * this.direction * deltaTime;

      if (this.direction) {
      this.distance += Math.abs(entity.vel.x) * deltaTime;
      } else {
        this.distance = 0;
      }
  }
}
  