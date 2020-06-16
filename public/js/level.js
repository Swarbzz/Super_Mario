import Compositor from './compsitor.js';
import {Matrix} from './math.js';

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set(); // new set prevents duplication of thing like mario for instance
    this.tiles = new Matrix();
  }

  update(deltaTime) {
    this.entities.forEach(enitiy => {
      enitiy.update(deltaTime);
    })
  }
}