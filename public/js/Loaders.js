import Level from './level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

function createTiles(level, backgrounds) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) { //width of the sky
        for (let y = y1; y < y2; ++ y) { // length of the sky
          level.tiles.set(x, y, {
            name: background.tile, //this talks to the level.json file to get the name of the tile
          });
        }
      }  
    });
  });
}

export function loadLevel(name) {
  return Promise.all([
    fetch(`./Levels/${name}.json`)
    .then(r => r.json()),
    loadBackgroundSprites(),
  ])
  .then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer); //adds background

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    //console.table(level.tiles.grid);// able to see the matrix grid

    return level;
  });
}