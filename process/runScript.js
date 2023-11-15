/*eslint-disable consistent-return */
const path = require('path');
const fse = require('fs-extra');
const { exec } = require('child_process');
const inquirer = require('inquirer');

const configPath = path.resolve(__dirname, '../process/experimentConfig.js');
const { sharedJsContent, createFile } = require('./cliUtils');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

fse.ensureFile(configPath).then(() => {
  inquirer
    .prompt([
      {
        type: 'fuzzypath',
        name: 'path',
        itemType: 'file',
        rootPath: './experiments',
        excludePath: (nodePath) => {
          return (
            nodePath.includes('main.css') ||
            nodePath.includes('main.bundle.js') ||
            nodePath.includes('index.html')
          );
        },
        message: 'Select experiment path:',
        depthLimit: 4
      }
    ])
    .then(function (answers) {
      const result = JSON.stringify(answers.path);
      const splitWith = result.includes('/') ? '/' : '\\';
      const data = result.split(splitWith);
      let number = 0,
        name,
        id,
        variation;

      data.forEach((e) => {
        if (e && number <= 4) {
          number++;
          if (number === 2) {
            name = e;
          } else if (number === 3) {
            id = e;
          } else if (number === 4) {
            variation = e;
          }
        }
      });
      //console.log(name, id, variation);

      exec(`npm run configpath -- sn=${name} en=${id} vn=${variation}`);
      createFile(configPath, sharedJsContent(name, id, variation));
    });
});
