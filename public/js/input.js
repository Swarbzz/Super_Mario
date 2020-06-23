import Keyboard from './keyboardState.js';

export function setUpKeyboard(entity) {
const SPACE = 32; // 32 is spacebar, not downward arrow, my bad
  const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
      if (keyState) {
        entity.jump.start();
      } else {
        entity.jump.cancel();
      }
  });
  input.addMapping(39, keyState => {
   entity.go.direction = keyState; //going right
  });
  input.addMapping(37, keyState => {
    entity.go.direction = -keyState; //going left
  });
  return input;
}