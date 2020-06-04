import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './Loaders.js';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) { //width of the sky
      for (let y = y1; y < y2; ++ y) { // length of the sky
        sprites.drawTile(background.tile, context, x, y); //this line determines where it should be displayed on the page
      }
    }  
  });
}
function loadMarioSprite() {
  return loadImage('/image/characters.gif')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('idle', 276, 44, 16, 16); //selects mario
    return sprites;
  });
}
function loadBackgroundSprites() {
  return loadImage('/image/tiles.png')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile('ground', 0, 0); // selects the ground tile 
    sprites.defineTile('sky', 3, 23); // selects the sky tile
    return sprites;
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ //allows sprites and level to load at the same time instead of one after another. 
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([marioSprite,sprites,level]) => {
  level.backgrounds.forEach(background => {
    drawBackground(background, context, sprites); //selects the tiles in 1-1.json via the arrays and displays them
  });
  marioSprite.draw('idle', context, 64, 64);
});