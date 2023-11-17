/* eslint-disable no-nested-ternary */
/*eslint-disable consistent-return */
const path = require('path');
const { exec } = require('child_process');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const { SITE, ID, VNAME } = require('./experimentConfig.js');
const { sharedJsContent, createFile } = require('./cliUtils');

const configPath = path.resolve(__dirname, '../process/experimentConfig.js');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

inquirer
  .prompt([
    {
      type: 'file-tree-selection',
      name: 'file',
      root: './experiments',
      validate: (input) => {
        const pathname = `${input.replace(/\\/gi, '/').split('experiments/')[1]}`;
        const level = pathname.split('/').length;
        if (level > 2) {
          return true;
        }
        if (level === 1 && pathname === 'undefined') {
          return true;
        }
        return 'PLEASE SELECT A VARIATION';
      },
      transformer: (input) => {
        const pathname = `${input.replace(/\\/gi, '/').split('experiments/')[1]}`;
        const name = pathname.split('/').length === 3 ? pathname.split('/')[2] : pathname.split('/').length === 2 ? pathname.split('/')[1] : pathname.split('/').length === 1 && pathname !== 'undefined' ? pathname.split('/')[0] : `CONTINUE PREVIOUS EXPERIMENT: ${SITE}-${ID} VARIATION: ${VNAME}`;
        return `${name}/`;
      }
    }
  ])
  .then((answer) => {
    const result = answer.file.replace(/\\/gi, '/');
    const data = result.split('experiments/')[1];
    const [client, id, variation] = data ? data.split('/').slice(0, 3) : [SITE, ID, VNAME];

    const content = sharedJsContent(client, id, variation);
    createFile(configPath, content); //makes it easier to make code pack
    exec(`npm run configpath -- sn=${client} en=${id} vn=${variation}`);
  });

// inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

// inquirer
//   .prompt([
//     {
//       type: 'fuzzypath',
//       name: 'path',
//       itemType: 'file',
//       rootPath: './experiments',
//       excludePath: (nodePath) => (
//         nodePath.includes('main.css')
//           || nodePath.includes('main.bundle.js')
//           || nodePath.includes('index.html')
//       ),
//       message: 'Select experiment path:',
//       depthLimit: 4
//     }
//   ])
//   .then((answers) => {
//     const result = answers.path.replace(/\\/gi, '/');
//     const data = result.split('/');
//     const [client, id, variation] = data.slice(1, 4);

//     const content = sharedJsContent(client, id, variation);
//     createFile(configPath, content); //makes it easier to make code pack
//     exec(`npm run configpath -- sn=${client} en=${id} vn=${variation}`);
//   });
