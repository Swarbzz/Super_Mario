import Camera from './Camera.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';

async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    const mario = entityFactory.mario();
    mario.pos.set(64, 64);

    // mario.addTrait({
    //     NAME: 'hacktrait',
    //     spawnTimeout: 0,
    //     obstruct() {

    //     },
    //     update(mario, deltaTime) {
    //         if (this.spawnTimeout > 0.1 && mario.vel.y < 0) {
    //             const spawn = createMario();
    //             spawn.pos.x = mario.pos.x;
    //             spawn.pos.y = mario.pos.y;
    //             spawn.vel.y = mario.vel.y - 200;
    //             level.entities.add(spawn);
    //             this.spawnTimeout = 0;
    //         } 
    //         this.spawnTimeout += deltaTime;
    //     }
    // })
    // The code above will spawn marios when he jumps, a wee bit of a laugh

    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if(mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(context, camera);
    }

    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas);