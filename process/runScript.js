/*eslint-disable consistent-return */
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const { exec } = require('child_process');
const inquirer = require('inquirer');

const configPath = path.resolve(__dirname, '../process/experimentConfig.js');
const { sharedJsContent, createFile } = require('./cliUtils');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

function onErr(err) {
  console.log(err);
  return 1;
}

fse.ensureFile(configPath).then(() => {
  let expClient, expId, expVar;
  fs.readFile(configPath, 'utf8', function (err, data) {
    if (err) onErr(err);

    const i = data.split("'");
    expClient = i[1];
    expId = i[3];
    expVar = i[5];
    const oldPath = `last-path->/${expClient}/${expId}/${expVar}`;
    //console.log(expClient, expId, expVar);

    inquirer
      .prompt([
        {
          type: 'fuzzypath',
          name: 'path',
          itemType: 'file',
          rootPath: './experiments',
          default: oldPath,
          excludePath: (nodePath) => {
            return (
              nodePath.includes('index.html') ||
              nodePath.includes('main.bundle.js') ||
              nodePath.includes('main.css')
            );
          },
          message: 'Select experiment to run:',
          depthLimit: 4
        }
      ])
      .then(function (answers) {
        [expClient, expId, expVar] = answers.path.replace(/\\/gi, '/').split('/').slice(1, 4);
        //console.log(expClient, expId, expVar);

        exec(`npm run configpath -- sn=${expClient} en=${expId} vn=${expVar}`);
        createFile(configPath, sharedJsContent(expClient, expId, expVar));
      });
  });
});
