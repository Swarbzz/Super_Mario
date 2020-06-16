function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) { //width of the sky
      for (let y = y1; y < y2; ++ y) { // length of the sky
        sprites.drawTile(background.tile, context, x, y); //this line determines where it should be displayed on the page
      }
    }  
  });
}

export function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;
  
  backgrounds.forEach(background => {
    drawBackground(background, buffer.getContext('2d'), sprites); //selects the tiles in 1-1.json via the arrays and displays them
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
