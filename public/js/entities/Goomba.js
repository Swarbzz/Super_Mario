import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
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
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) { //if they (mario in this case) has the trait stomper then behave in this way
            if (them.vel.y > us.vel.y){
                us.killable.kill();
                them.stomper.bounce();
                us.pendulumWalk.speed = 0;
            }
        }
    }
}

function createGoombaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(goomba) {
        if (goomba.killable.dead) {
            return 'flat';
        }

        return walkAnim(goomba.lifetime);
    }

    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait(new PendulumWalk());
        goomba.addTrait(new Behaviour());
        goomba.addTrait(new Killable());

        goomba.draw = drawGoomba;

        return goomba;
    }
}