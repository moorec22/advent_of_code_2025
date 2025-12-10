import { splitLines } from '../utils/files.js';

function getRotationParts(line) {
  return [line[0], parseInt(line.slice(1), 10)];
}

export function part1(data) {
  let position = 50;
  let count = 0;

  const lines = splitLines(data);

  for (const line of lines) {
    const [direction, steps] = getRotationParts(line);
    if (direction === 'R') {
      position += steps;
    } else if (direction === 'L') {
      position -= steps;
    }
    if (position % 100 === 0) {
      count++;
    }
  }

  console.log(`part 1: ${count}`);
}

export function part2(data) {
  let position = 50;
  let count = 0;

  const lines = splitLines(data);

  for (const line of lines) {
    const [direction, steps] = getRotationParts(line);
    count += Math.floor(steps / 100);
    let newPosition = position;
    if (direction === 'R') {
      newPosition += steps % 100;
    } else {
      newPosition -= steps % 100;
    }
    // decide if newPosition crossed 0
    if (newPosition >= 100 || (newPosition < 0 && position != 0) || newPosition === 0) {
      count++;
    }
    position = (newPosition + 100) % 100;
  }

  console.log(`part 2: ${count}`);
}
