// parse file
// start at 50
// for each line:
//   determine next location
//   increment count if next location is 0

const fs = require('fs');

const isTest = process.argv.includes('--test');
const fileName = isTest ? 'files/test.txt' : 'files/input.txt';

function parseFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}

function getRotationParts(line) {
  return [line[0], parseInt(line.slice(1), 10)];
}

const file = parseFile(fileName);

let position = 50;
let count = 0;

for (const line of file) {
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

position = 50;
count = 0;

for (const line of file) {
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
