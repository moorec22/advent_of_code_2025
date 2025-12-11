/**
 * https://adventofcode.com/2025/day/2
 * 
 * The naive solution to both parts is to go through each number in the range, and determine if it meets the criteria.
 * If n is the number of numbers in the range, and d is the number of digits in the largest number, then this solution
 * has a time complexity of O(n) for part 1 and O(n * d) for part 2 (for a single range).
 * 
 * If we instead construct the periodic numbers in the range, we can get that runtime down to O(log(n)) part 1 and O(log(n) * d) for part 2.
 * 
 * For part 1, we can take the first half of the number and repeat it to form the periodic number. For example, if the number
 * is 123456, we take the first half (123) and repeat it to form 123123.
 * 
 * For part 2, we'll need to repeat this process for each possible repeat count from 2 to the number of digits in the largest number.
 * 
 * The downside is, we need to keep track of IDs we've found so as to not repeat them. Alternatively, we can use the KMP algorithm
 * to test for periodicity in each number.
 */

// returns the number of digits in a number. For example, if num is 123, the function returns 3.
function getNumDigits(num) {
  return Math.floor(Math.log10(num)) + 1;
}

// returns the length of the segment that is repeated. For example, if num is 123456 and repeatCount is 2,
// the function returns 3. If num is 12345678 and repeatCount is 3, the function returns 3.
function getSegmentLength(numDigits, repeatCount) {
  return Math.trunc(numDigits / repeatCount);
}

// repeats a number repeatCount times. For example, if num is 123 and repeatCount is 2,
// the function returns 123123.
function repeatNumber(num, repeatCount) {
  const digits = getNumDigits(num);
  let result = num;
  for (let i = 1; i < repeatCount; i++) {
    result = result * Math.pow(10, digits) + num;
  }
  return result;
}

// returns the first segment of a number that can be repeated to form a periodic number that is greater
// than the number itself. For example, if num is 123456 and repeatCount is 2, the function returns 123.
// If num is 12345678 and repeatCount is 3, the function returns 123.
function getFirstSegment(num, repeatCount) {
  const numDigits = getNumDigits(num);
  const segmentLength = getSegmentLength(numDigits, repeatCount);
  if (numDigits % repeatCount === 0) {
    const segment = Math.trunc(num / Math.pow(10, numDigits - segmentLength));
    if (repeatNumber(segment, repeatCount) < num) {
      return segment + 1;
    } else {
      return segment;
    }
  } else {
    return Math.pow(10, segmentLength);
  }
}

export function part1(data) {
  const ranges = data.split(',');
  let totalScore = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    let segment = getFirstSegment(start, 2);
    let periodicNum = repeatNumber(segment, 2);
    while (periodicNum <= end) {
      totalScore += periodicNum;
      segment += 1;
      periodicNum = repeatNumber(segment, 2);
    }
  }
  console.log(`Part 1: ${totalScore}`);
}

export function part2(data) {
  const seen = new Set();
  const ranges = data.split(',');
  let totalScore = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    for (let repeatCount = 2; repeatCount <= getNumDigits(end); repeatCount++) {
      let segment = getFirstSegment(start, repeatCount);
      let periodicNum = repeatNumber(segment, repeatCount);
      while (periodicNum <= end) {
        if (!seen.has(periodicNum)) {
          seen.add(periodicNum);
          totalScore += periodicNum;
        }
        segment += 1;
        periodicNum = repeatNumber(segment, repeatCount);
      }
    }
  }
  console.log(`Part 2: ${totalScore}`);
}