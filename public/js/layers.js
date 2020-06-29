// function drawBackground(background, context, sprites) {
//   background.ranges.forEach(([x1, x2, y1, y2]) => {
//     for (let x = x1; x < x2; ++x) { //width of the sky
//       for (let y = y1; y < y2; ++ y) { // length of the sky
//         sprites.drawTile(background.tile, context, x, y); //this line determines where it should be displayed on the page
//       }
//     }  
//   });
// }
import {Matrix} from './math.js';

export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext('2d')

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });
  
  
  return function drawBackgroundLayer(context, camera) {
    context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
  };
}


export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach(entity => {
      entity.draw(context);
    });
  }
}

export function createCollisionLayer(level) {
  const resolvedTiles = [];

  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({x, y});
    //console.log(x, y); // this identifies the tile number in correspondance of the grid in which mario is situatated. 
    return getByIndexOriginal.call(tileResolver, x, y);
  }

  return function drawCollision(context) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(
        x * tileSize, y * tileSize, 
        tileSize, tileSize); // all tilesize variables will contain 16 
      context.stroke(); // shows us what tiles we are actually touching with our mouse, good for debugging
    });

    context.strokeStyle = 'red';
    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(
        entity.pos.x, entity.pos.y, 
        entity.size.x, entity.size.y);
      context.stroke();
    })

    resolvedTiles.length = 0;
  }
} // this function tracks the tiles called from getByIndex in tileResolver
