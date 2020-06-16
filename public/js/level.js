import Compositor from './compsitor.js';

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set(); // new set prevents duplication of thing like mario for instance
  }

  update(deltaTime) {
    this.entities.forEach(enitiy => {
      enitiy.update(deltaTime);
    })
  }
}