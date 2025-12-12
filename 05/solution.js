/**
 * https://adventofcode.com/2025/day/5
 * 
 * My first naive idea for part 1 is to store the ranges in an array, and for each
 * ID see if it's inclusive in any of the ranges. This is O(n * m) where n is the
 * number of ranges and m is the number of IDs to check.
 * 
 * We could store the start of each range in a sorted set. This reduces the runtime
 * to O(m log n).
 * 
 * With preprocessing, we can do better. We can merge overlapping ranges into a single
 * range. That way, to see if an ID is in a range, we can find the first range that starts
 * before the ID. This is the same as a search algorithm: O(log n).
 * 
 * First, sort ranges. O(n log n).
 * Second, merge overlapping ranges. O(n).
 * Finally, for each ID, do a binary search to find if it's in a range. O(m * log n).
 * In total, the runtime is O((m + n) log n), where m is the number of IDs and n is the number
 * of ranges.
 */
import { splitLines } from '../utils/files.js';

// Parses the input lines into ranges and IDs.
function getInitialRangesAndIds(lines) {
  const ranges = [];
  const ids = [];
  let currentLine = 0;
  while (lines[currentLine] !== '') {
    const line = lines[currentLine];
    currentLine++;
    const [startStr, endStr] = line.split('-');
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);
    ranges.push([start, end]);
  }
  for (let i = currentLine + 1; i < lines.length; i++) {
    const id = parseInt(lines[i], 10);
    ids.push(id);
  }
  return { ranges, ids };
}

// Sorts and merges overlapping ranges.
function mergeRanges(ranges) {
  if (ranges.length === 0) {
    return [];
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [ranges[0]];
  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i][0] <= merged[merged.length - 1][1]) {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], ranges[i][1]);
    } else {
      merged.push(ranges[i]);
    }
  }
  return merged;
}

// Returns true if id is in any of the ranges.
function idInRanges(id, ranges) {
  let left = 0;
  let right = ranges.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (id < ranges[mid][0]) {
      right = mid - 1;
    } else if (id > ranges[mid][1]) {
      left = mid + 1;
    } else {
      return true;
    }
  }
  return false;
}

export function part1(data) {
  const lines = splitLines(data);
  const { ranges, ids } = getInitialRangesAndIds(lines);
  const mergedRanges = mergeRanges(ranges);
  let count = 0;
  for (let id of ids) {
    if (idInRanges(id, mergedRanges)) {
      count++;
    }
  }
  console.log(`Part 1: ${count}`);
}

export function part2(data) {
}
