import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './Loaders.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

loadImage('/image/tiles.png')
.then(image => {
  const sprites = new SpriteSheet(image, 16, 16); //this line determines which tile to select
  sprites.define('ground', 0, 0); // selects the ground tile 
  sprites.define('sky', 3, 23); // selects the sky tile

  for (let x = 0; x < 25; ++x) { //width of the sky
    for (let y = 0; y < 14; ++ y) { // length of the sky
      sprites.drawTile('sky',context, x, y); //this line determines where it should be displayed on the page
    }
  }

  for (let x = 0; x < 25; ++x) { //width of the ground
    for (let y = 12; y < 14; ++ y) { // length of the ground
      sprites.drawTile('ground',context, x, y); //this line determines where it should be displayed on the page
    }
  }
});