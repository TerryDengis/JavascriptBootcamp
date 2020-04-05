const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const render = require('./render');

const ignoreDirs = ['node_modules'];
class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`---> ${file.shortName}`));

      global.render = render;

      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      const afterEaches = [];
      global.afterEach = (fn) => {
        afterEaches.push(fn);
      };

      global.it = async (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          await fn();
          console.log(chalk.green(`\tOK -> ${desc}`));
        } catch (err) {
          console.log(chalk.red(`\tX -> ${desc}`));
          console.log(chalk.red('\t', err.message.replace(/\n/g, '\n\t\t')));
        }
        afterEaches.forEach((func) => func());
      };
      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.red('X -> Error loading test file ', file.name));
        console.log(err);
      }
      // runs the test file
    }
  }
  // breadth first traversal
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);
    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.endsWith('.test.js')) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !ignoreDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
