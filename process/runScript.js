/* eslint-disable no-nested-ternary */
/*eslint-disable consistent-return */
const path = require('path');
const { exec } = require('child_process');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');

const { SITE, ID, VNAME } = require('./experimentConfig.js');
const { sharedJsContent, createFile } = require('./cliUtils');
const configPath = path.resolve(__dirname, '../process/experimentConfig.js');

const checkPathInExp = (route) => {
  const routeName = route.replace(/\\/gi, '/');

  if (routeName.includes('experiments/')) return routeName.split('experiments/').pop().split('/');
  return false;
};

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);
inquirer
  .prompt([
    {
      type: 'file-tree-selection',
      name: 'selectDirectory',
      root: './experiments',
      validate: (route) => {
        const pathList = checkPathInExp(route);
        if (pathList) {
          if (pathList.length > 2) return true;
          return false;
        }
        return true;
      },
      transformer: (route) => {
        const pathList = checkPathInExp(route);
        if (pathList) return pathList.pop();
        return `Continue where you left? ${SITE}-${ID}(${VNAME})`;
      },
      onlyShowDir: true
    }
  ])
  .then((result) => {
    const data = checkPathInExp(result.selectDirectory);
    let expClient = SITE,
      expId = ID,
      expVariation = VNAME;

    if (data) [expClient, expId, expVariation] = data.slice(0, 3);
    exec(`npm run configpath -- sn=${expClient} en=${expId} vn=${expVariation}`);
    createFile(configPath, sharedJsContent(expClient, expId, expVariation));
  });
