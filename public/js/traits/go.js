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
      this.distance += entity.vel.x * deltaTime;
  }
}
  