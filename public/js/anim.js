export function createAnim(frames, frameLen) { 
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameLen) % frames.length; // frames[frameIndex] will display run-1 to run-3
    const frameName = frames[frameIndex];
    return frameName;
  }
}