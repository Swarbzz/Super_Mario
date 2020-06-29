export default class Compositor {
    constructor() {
      this.layers = [];
    }
    draw(context, camera) {
      this.layers.forEach(layer => {
        layer(context, camera); //layer is a function that draws on the context
      });
    }
  }