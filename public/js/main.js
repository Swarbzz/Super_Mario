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

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/image/tiles.png')
.then(image => {
  const sprites = new SpriteSheet(image, 16, 16); //this line determines which tile to select
  sprites.define('ground', 0, 0); // selects the ground tile 
  sprites.define('sky', 3, 23); // selects the sky tile

  loadLevel('1-1')
  .then(level => {
    console.log(level);
    drawBackground(level.backgrounds[0], context, sprites);
  });
  
  for (let x = 0; x < 25; ++x) { //width of the ground
    for (let y = 12; y < 14; ++ y) { // length of the ground
      sprites.drawTile('ground',context, x, y); //this line determines where it should be displayed on the page
    }
  }
});