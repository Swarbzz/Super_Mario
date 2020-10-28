import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 400;
        this.dragFactor = 1/5000; // so Mario doesn't go at light speed


        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {

        if (this.dir) {
            entity.vel.x += this.acceleration * this.dir * deltaTime;
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
        entity.vel.x -= drag;
    }
}
