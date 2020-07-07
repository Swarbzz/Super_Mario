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