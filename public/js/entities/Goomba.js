import Entity, {Sides} from '../Entity.js';
import {loadSpriteSheet} from '../Loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba') // loads the json
    .then(createGoombaFactory);
}

function createGoombaFactory(sprite) {
    function drawGoomba(context) {
        sprite.draw('walk-1', context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait({
            NAME: 'walk',
            speed: -30,
            obstruct(goomba, side) {
                if (side === Sides.LEFT || side === Sides.RIGHT) {
                    this.speed = -this.speed;
                }
            },
            update(goomba) {
                goomba.vel.x = this.speed;
            }
        })

        goomba.draw = drawGoomba;

        return goomba;
    }
}