import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './Loaders.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

loadImage('/image/tiles.png')
.then(image => {
  const sprites = new SpriteSheet(image, 16, 16); //this line determines which tile to select
  sprites.define('ground', 0, 0);
  sprites.draw('ground',context, 45 ,62); //this line determines where it should be displayed on the page
});