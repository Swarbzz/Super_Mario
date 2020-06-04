import {loadImage} from './Loaders.js';
import SpriteSheet from './SpriteSheet.js';

export function loadMarioSprite() {
  return loadImage('/image/characters.gif')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('idle', 276, 44, 16, 16); //selects mario
    return sprites;
  });
}
export function loadBackgroundSprites() {
  return loadImage('/image/tiles.png')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile('ground', 0, 0); // selects the ground tile 
    sprites.defineTile('sky', 3, 23); // selects the sky tile
    return sprites;
  });
}