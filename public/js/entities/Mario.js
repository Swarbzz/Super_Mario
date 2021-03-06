import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Stomper from '../traits/Stomper.js';
import {loadSpriteSheet} from '../Loaders.js';
import Killable from '../traits/Killable.js';

const FAST_DRAG = 1/5000;
const SLOW_DRAG = 1/1500;

export function loadMario() {
    return loadSpriteSheet('mario')
    .then(createMarioFactory);
}

function createMarioFactory(sprite) {
    const runAnim = sprite.animations.get('run');
    function routeFrame(mario) {
        if (mario.jump.falling) {
            return 'jump'; //jump animation
        }

        if (mario.go.distance > 0) {
            if (mario.vel.x > 0 && mario.go.dir < 0 || mario.vel.x < 0 && mario.go.dir > 0) {
                return 'break'; // return the animation frame of mario turning while running
            }
            return runAnim(mario.go.distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Killable())
        mario.addTrait(new Stomper());

        mario.killable.removeAfter = 0;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false); // basically goes to SLOW_DRAG

        return mario;
    }
}