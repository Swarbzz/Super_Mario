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
function loadBackgroundSprites() {
  return loadImage('/image/tiles.png')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16); //this line determines which tile to select
    sprites.define('ground', 0, 0); // selects the ground tile 
    sprites.define('sky', 3, 23); // selects the sky tile
    return sprites;
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([sprites,level]) => {
  level.backgrounds.forEach(background => {
    drawBackground(background, context, sprites); //selects the tiles in 1-1.json via the arrays and displays them
  });
});