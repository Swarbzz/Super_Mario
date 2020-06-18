// function drawBackground(background, context, sprites) {
//   background.ranges.forEach(([x1, x2, y1, y2]) => {
//     for (let x = x1; x < x2; ++x) { //width of the sky
//       for (let y = y1; y < y2; ++ y) { // length of the sky
//         sprites.drawTile(background.tile, context, x, y); //this line determines where it should be displayed on the page
//       }
//     }  
//   });
// }

export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext('2d')

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });
  
  
  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
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
  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    console.log(x, y); // this identifies the tile number in correspondance of the grid in which mario is situatated. 
    return getByIndexOriginal.call(tileResolver, x, y);
  }
} // this function tracks the tiles called from getByIndex in tileResolver
