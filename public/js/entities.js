import {loadKoopa} from './entities/Koopa.js';
import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';

export function loadEntities() {
    const entityFactories = {};


    return Promise.all([
        loadMario().then(factory => entityFactories['mario'] = factory),
        loadGoomba().then(factory => entityFactories['goomba'] = factory),
        loadKoopa().then(factory => entityFactories['koopa'] = factory),
    ])
    .then(() => entityFactories);
}