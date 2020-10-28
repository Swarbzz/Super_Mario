import {Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = false;
        this.duration = 0.5;
        this.engageTime = 0;

        this.velocity = 200;
    }

    start() {
        if (this.ready) {
            this.engageTime = this.duration;
        }
    }

    cancel() {
        this.engageTime = 0;
    }

    obstruct(entity, side) {
        if(side === 'bottom') {
            this.ready = true; // This means mario can't double, triple, infinitly jump
        }
    }

    update(entity, deltaTime) {
        // console.log('Can Jump?', this.ready);

        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }

        this.ready = false;
    }
}
