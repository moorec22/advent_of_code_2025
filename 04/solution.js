/**
 * https://adventofcode.com/2025/day/4
 * 
 * A naive solution to part 1 would be to, for each position, check every adjacent position
 * and count how many rolls are present. If the number is under 4, we can consider the paper
 * roll accessible. For an n x m grid, this would be O(n * m) runtime. We certainly can't do
 * better than that for part 1, since we have to at least read the entire grid.
 * 
 * For part 2, I'm going to start with the naive solution: get the list of accessible rolls,
 * remove them, repeat until no more rolls can be removed. This process is O((n * m)^2).
 */
import { splitLines } from '../utils/files.js';

function inRange(lines, x, y) {
  return x >= 0 && x < lines.length && y >= 0 && y < lines[0].length;
}

function getAccessibleRolls(lines, removedRolls = new Set()) {
  const accessibleRolls = new Set();
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i].charAt(j) !== '@' || removedRolls.has(`${i},${j}`)) {
        continue;
      }
      let count = 0;
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if ((di !== 0 || dj !== 0) && inRange(lines, i + di, j + dj) && lines[i + di].charAt(j + dj) === '@' && !removedRolls.has(`${i + di},${j + dj}`)) {
            count++;
          }
        }
      }
      if (count < 4) {
        accessibleRolls.add(`${i},${j}`);
      }
    }
  }
  return accessibleRolls;
}

export function part1(data) {
  const lines = splitLines(data);
  const accessibleRolls = getAccessibleRolls(lines);
  console.log(`Part 1: ${accessibleRolls.size}`);
}

export function part2(data) {
  let removedRolls = new Set();
  const lines = splitLines(data);
  let accessibleRolls = null;
  do {
    accessibleRolls = getAccessibleRolls(lines, removedRolls);
    removedRolls = new Set([...removedRolls, ...accessibleRolls]);
  } while (accessibleRolls.size > 0);
  console.log(`Part 2: ${removedRolls.size}`);
}
