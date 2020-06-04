import {loadLevel} from './Loaders.js';
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js';

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