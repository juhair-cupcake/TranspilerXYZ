/*eslint-disable global-require */
/*eslint-disable func-names */
/*eslint-disable consistent-return */
/*eslint-disable no-shadow */
/*eslint-disable no-use-before-define */
/*eslint-disable object-curly-newline */
/*eslint-disable prefer-arrow-callback */
/*eslint-disable no-undef */

const path = require('path');
const { exec } = require('child_process');
const prompt = require('prompt');
const fse = require('fs-extra');

const configPath = path.resolve(__dirname, '../process/experimentConfig.js');
fse.ensureFile(configPath).then(() => {
  const { sharedJsContent, createFile, runExpSchema } = require('./cliUtils');

  prompt.start();

  prompt.get(runExpSchema, (err, result) => {
    if (err) {
      return onErr(err);
    }
    const { siteName, experimentId, variationName } = result;

    const expPath = path.resolve(
      __dirname,
      `../experiments/${siteName}/${experimentId}/${variationName}/src/func/info.js`
    );

    const content = sharedJsContent(siteName, experimentId, variationName);

    createFile(expPath, content);
    createFile(configPath, content); //makes it easier to make code pack

    exec(`npm run configpath -- sn=${siteName} en=${experimentId} vn=${variationName}`);
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}
