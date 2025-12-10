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
function numDigits(num) {
  return Math.floor(Math.log10(num)) + 1;
}

// repeats a number repeatCount times. For example, if num is 123 and repeatCount is 2,
// the function returns 123123.
function repeatNumber(num, repeatCount) {
  const digits = numDigits(num);
  let result = num;
  for (let i = 1; i < repeatCount; i++) {
    result = result * Math.pow(10, digits) + num;
  }
  return result;
}

function sumPeriodicNumbers(start, end, repeatCount, seenNumbers = new Set()) {
  let sum = 0;
  const startDigits = numDigits(start);
  const splitter = Math.pow(10, Math.trunc(startDigits - startDigits / repeatCount));
  let n = 0;
  if (startDigits % repeatCount === 0) {
    const firstSegment = Math.trunc(start / splitter);
    if (repeatNumber(firstSegment, repeatCount) < start) {
      n = firstSegment + 1;
    } else {
      n = firstSegment;
    }
  } else {
    n = splitter;
  }
  while (repeatNumber(n, repeatCount) <= end) {
    if (!seenNumbers.has(repeatNumber(n, repeatCount))) {
      seenNumbers.add(repeatNumber(n, repeatCount));
      sum += repeatNumber(n, repeatCount);
    }
    n++;
  }
  return sum;
}

export function part1(data) {
  const ranges = data.split(',');
  let totalScore = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    totalScore += sumPeriodicNumbers(start, end, 2);
  }
  console.log(`Part 1: ${totalScore}`);
}

export function part2(data) {
  const ranges = data.split(',');
  let totalScore = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    const seenNumbers = new Set();
    for (let repeatCount = 2; repeatCount <= numDigits(start); repeatCount++) {
      totalScore += sumPeriodicNumbers(start, end, repeatCount, seenNumbers);
    }
    for (let repeatCount = numDigits(start) + 1; repeatCount <= numDigits(end); repeatCount++) {
      totalScore += sumPeriodicNumbers(Math.pow(10, repeatCount - 1), end, repeatCount, seenNumbers);
    }
  }
  console.log(`Part 2: ${totalScore}`);
}