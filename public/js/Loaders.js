import Level from './level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import SpriteSheet from './SpriteSheet.js';

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJSON(url) {
  return fetch(url)
  .then(r => r.json());
}

function createTiles(level, backgrounds) {
  function applyRange(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen; // allows the json file to have to the length of blocks rather than the position, so i can set the start of the block to only be 2 blocks long, see json file for reference
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) { //width of the sky -- old comment but want to keep it for reference
      for (let y = yStart; y < yEnd; ++ y) { // length of the sky -- old comment but want to keep it for reference
        level.tiles.set(x, y, {
          name: background.tile, //this talks to the level.json file to get the name of the tile
          type: background.type,
        });
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach(range => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        applyRange(background, xStart, xLen, yStart, yLen);

      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(background, xStart, xLen, yStart, 1);

      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1); // this function allows me to change the json so i do not have to put the length of a tile as 1 if applicable.
      }
    });
  });
}

export function loadSpriteSheet(name) { // function to get the current json file
  return loadJSON(`/sprites/${name}.json`)
  .then(sheetSpec => Promise.all([
    sheetSpec,
    loadImage(sheetSpec.imageURL),
  ]))
  .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

    if (sheetSpec.tiles) {
      sheetSpec.tiles.forEach(tileSpec => {
        sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]); // selects the appropriate tiles
      });
    }

    if (sheetSpec.frames) {
      sheetSpec.frames.forEach(frameSpec => {
        sprites.define(frameSpec.name, ...frameSpec.rect); // the three dots allows an expression to be expanded in places where multiple arguments are expected
                                                            // i.e. it will load the all the coordinates for mario labled in the "rect" mario.json
      });
    }
      return sprites;
    });
}

export function loadLevel(name) {
  return loadJSON(`./Levels/${name}.json`)
  .then(levelSpec => Promise.all([
    levelSpec, loadSpriteSheet(levelSpec.spriteSheet),
  ]))
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