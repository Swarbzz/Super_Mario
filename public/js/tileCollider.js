import TileResolver from './tileResolver.js';

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkY(entity) {
    const matches = this.tiles.searchByRange(
      entity.pos.x, entity.pos.x + entity.size.x,
      entity.pos.y, entity.pos.y + entity.size.y
      );
      matches.forEach (match => {
        if (match.tile.name !== 'ground') {
          return;
        }
        if (entity.vel.y > 0) {
          if (entity.pos.y > match.y1) {
            entity.pos.y = match.y1; // y1 is a number calculated by the TileResolver
            entity.vel.y = 0; // mario will stop and hit the floor
          }
        } else if (entity.vel.y < 0) {
          if (entity.pos.y < match.y2) {
            entity.pos.y = match.y2; // y2 is a number calculated by the TileResolver
            entity.vel.y = 0; // mario will bump his head on the ceiling 
          }
        }
      });
    }

  test(entity) {
    this.checkY(entity)
    //console.log('testing', entity)
  }
}