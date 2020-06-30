export function setupMouseControl(canvas, entity, camera) {
  // DEBUGGING CODE!!
  ['mousedown', 'mousemove'].forEach(eventName => { 
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y); // this allows me to move mario with a click and drag off my mouse
      }
    });
  });
}