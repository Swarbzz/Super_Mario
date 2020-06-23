import Keyboard from './keyboardState.js';

export function setUpKeyboard(entity) {
  const input = new Keyboard();
    input.addMapping("Space", keyState => {
      if (keyState) {
        entity.jump.start();
      } else {
        entity.jump.cancel();
      }
  });
  input.addMapping("ArrowRight", keyState => {
   entity.go.direction = keyState; //going right
  });
  input.addMapping("ArrowLeft", keyState => {
    entity.go.direction = -keyState; //going left
  });
  return input;
}