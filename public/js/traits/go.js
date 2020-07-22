import {Trait} from '../entity.js';

export default class Go extends Trait {
  constructor() {
    super('go');
    this.direction = 0; 
    this.acceleration = 400; 
    this.dragFactor = 1/5000

    this.distance = 0;
    this.heading = 1; //where mario is facing
  }
    
  update(entity, deltaTime) {
    const absX =  Math.abs(entity.vel.x)
        if (this.direction) {
        entity.vel.x += this.acceleration* deltaTime  * this.direction ;
        this.heading = this.direction;
        this.distance += absX * deltaTime;
      } else {
        this.distance = 0;
      }
      const drag = this.dragFactor * entity.vel.x * absX
      entity.vel.x -= drag;
  }
}
  