/*eslint-disable consistent-return */
const path = require('path');
const { exec } = require('child_process');
const inquirer = require('inquirer');

const { sharedJsContent, createFile } = require('./cliUtils');
const configPath = path.resolve(__dirname, '../process/experimentConfig.js');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

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
    const data = JSON.stringify(answers.path).split('/');

    const content = sharedJsContent(data[1], data[2], data[3]);
    createFile(configPath, content); //makes it easier to make code pack
    exec(`npm run configpath -- sn=${data[1]} en=${data[2]} vn=${data[3]}`);
  });
