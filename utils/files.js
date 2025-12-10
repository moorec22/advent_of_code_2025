import fs from 'fs';

export function readInputFile(day) {
  const isTest = process.argv.includes('--test');
  const fileName = isTest ? `${day}/files/test.txt` : `${day}/files/input.txt`;
  return fs.readFileSync(fileName, 'utf8');
}

export function splitLines(data) {
  return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}
