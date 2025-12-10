/**
 * This script reads the input file for a specific day and runs the solution functions for that day.
 * It expects the day number to be provided as a command-line argument using the --day flag.
 * If no day is provided, it will log an error message and exit.
 * 
 * use: node run.js --day <day_number> [--test]
 */

import { readInputFile } from "./utils/files.js";
const day = process.argv.indexOf('--day') > -1 ? process.argv[process.argv.indexOf('--day') + 1] : null;

if (!day) {
  console.log('No day provided. Please use the --day flag followed by the day number.');
  exit(1);
}

const data = readInputFile(day);

if (!data) {
  console.log('No data found for the provided day.');
  process.exit(1);
}

const { part1, part2 } = await import(`./${day}/solution.js`);

if (!part1 || !part2) {
  console.log('Invalid solution file. Please ensure that the solution file has both part1 and part2 functions.');
  process.exit(1);
}

part1(data);
part2(data);
