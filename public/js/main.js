import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';
import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMario(),
    loadGoomba(),
    loadLevel('1-1'),
])
.then(([createMario, createGoomba, level]) => {
    const camera = new Camera();
    window.camera = camera;

    const mario = createMario();
    mario.pos.set(64, 64);

    const goomba = createGoomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

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
});