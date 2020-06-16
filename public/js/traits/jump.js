import {Trait} from '../entity.js';

export default class Jump extends Trait {
  constructor() {
    super('jump');
    this.duration = 0.5; //sets the limit for the amount of time a player can hold the space bar
    this.velocity = 200; //speed
    this.engageTime = 0;
  }

  start() {
    this.engageTime = this.duration
  }

  cancel() {
    this.engageTime = 0;
  }
    
  update(entity,deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.y = - this.velocity; 
      this.engageTime -= deltaTime;
    }
  }
}
  