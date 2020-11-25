import Entity, {Sides, Trait} from '../Entity.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../Loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba') // loads the json
    .then(createGoombaFactory);
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {
        if (them.stomper) { //if they (mario in this case) has the trait stomper then behave in this way
            us.pendulumWalk.speed = 0;
        }
    }
}

function createGoombaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function drawGoomba(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait(new PendulumWalk());
        goomba.addTrait(new Behaviour());

        goomba.draw = drawGoomba;

        return goomba;
    }
}