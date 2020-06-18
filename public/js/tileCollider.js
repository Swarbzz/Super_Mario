import TileResolver from './tileResolver.js';

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  test(entity) {
    const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
    if (match) {
      console.log('Matched tile', match, match.tile); // this displays the tile mario runs into
    }
    //console.log('testing', entity)
  }
}