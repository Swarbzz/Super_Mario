export default class Timer {
  constructor(deltaTime = 1/60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000; //decoupled the internal framerate of the game from the rendering framerate 
  
      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }
      lastTime = time;
      this.enqueue();
    }
  }
  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }
  start() {
    this.enqueue();
  }
}