/**
 * https://adventofcode.com/2025/day/3
 * 
 * To solve this one, we can go in reverse order and create the largest number possible in
 * a line of size n while preserving relative order. The meat of this solution ends up in
 * getLargestNumber.
 */
import { splitLines } from '../utils/files.js';

function arrayToNumber(arr) {
  return arr.reduce((acc, digit) => acc * 10 + digit, 0);
}

// Given a new number, adds it to the digits array to make the largest
// number possible while preserving relative order. number is placed in
// currentPos, if at all.
function addNumberToDigits(digits, number, currentPos = 0) {
  if (currentPos >= digits.length) {
    return;
  }
  if (number >= digits[currentPos]) {
    addNumberToDigits(digits, digits[currentPos], currentPos + 1);
    digits[currentPos] = number;
  }
}

// finds the largest number in num that can be formed with numDigits digits. The digits
// have to be in order. For example, if num = 54321 and numDigits = 3, the largest number is 543.
// If num = 51252, and numDigits = 3, the largest number is 552.
function getLargestNumber(numString, numDigits) {
  if (numDigits <= 0 || numDigits > numString.length) {
    throw new Error('Invalid number of digits');
  }
  const reverseDigits = [];
  for (let i = 0; i < numDigits; i++) {
    reverseDigits.push(parseInt(numString.charAt(numString.length - 1 - i), 10));
  }
  const digits = reverseDigits.reverse();
  for (let i = numString.length - numDigits - 1; i >= 0; i--) {
    const currentDigit = parseInt(numString.charAt(i), 10);
    addNumberToDigits(digits, currentDigit);
  }
  return arrayToNumber(digits);
}

export function part1(data) {
  const lines = splitLines(data);
  let sum = 0;
  for (let line of lines) {
    sum += getLargestNumber(line, 2);
  }
  console.log(`Part 1: ${sum}`);
}

export function part2(data) {
  const lines = splitLines(data);
  let sum = 0;
  for (let line of lines) {
    sum += getLargestNumber(line, 12);
  }
  console.log(`Part 2: ${sum}`);
}
