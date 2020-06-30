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
    background.ranges.forEach(([xStart, xLen, yStart, yLen]) => {
      const xEnd = xStart + xLen; // allows the json file to have to the length of blocks rather than the position, so i can set the start of the block to only be 2 blocks long, see json file for reference
      const yEnd = yStart + yLen;
      for (let x = xStart; x < xEnd; ++x) { //width of the sky -- old comment but want to keep it for reference
        for (let y = yStart; y < yEnd; ++ y) { // length of the sky -- old comment but want to keep it for reference
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