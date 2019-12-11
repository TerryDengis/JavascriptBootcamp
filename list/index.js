#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// Method #2
// const lstat = util.promisify(fs.lstat);
//method 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, fileNames) => {
  if (err) {
    // handle error here
    console.log(err);
  }
  const statPromises = fileNames.map(fileName => {
    return lstat(path.join(targetDir, fileName));
  });
  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      console.log(fileNames[index]);
    } else {
      console.log(chalk.bold(fileNames[index]));
    }
  }
});
// Method #1
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
