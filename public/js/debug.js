export function setupMouseControl(canvas, entity, camera) {
  let lastEvent;
  // DEBUGGING CODE!!
  ['mousedown', 'mousemove'].forEach(eventName => { 
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y); // this allows me to move mario with a click and drag off my mouse
      } else if (event.buttons === 2
        && lastEvent && lastEvent.buttons === 2
        && lastEvent.type === 'mousemove') {
        camera.pos.x -= event.offsetX - lastEvent.offsetX; //allows you to scroll with the right mouse button
      }
      lastEvent = event;
    });
  });
  canvas.addEventListener('contextmenu', event => {
    event.preventDefault(); // gets rid of the pop up menu when right clicking
  })
}