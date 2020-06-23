import Compositor from './compsitor.js';
import TileCollider from './tileCollider.js';
import {Matrix} from './math.js';

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set(); // new set prevents duplication of thing like mario for instance
    this.tiles = new Matrix();

    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);
    })
  }
}