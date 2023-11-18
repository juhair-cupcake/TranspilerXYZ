/*eslint-disable function-paren-newline */
/*eslint-disable consistent-return */
const fse = require('fs-extra');
const prompt = require('prompt');
const path = require('path');

const expConfigPathe = path.resolve(__dirname, '../process/experimentConfig.js');
const { sharedJsContent, createFile, createExpSchema } = require('./cliUtils');

function onErr(err) {
  console.log(err);
  return 1;
}

fse.ensureFile(expConfigPathe).then(() => {
  prompt.start();

  prompt.get(createExpSchema, (err, result) => {
    if (err) return onErr(err);

    const { siteName, experimentId, variationName } = result;

    const dir = path.resolve(
      __dirname,
      `../experiments/${siteName}/${experimentId}/${variationName}/`
    );

    const content = sharedJsContent(siteName, experimentId, variationName);

    fse
      .ensureDir(dir)
      .then(
        () => fse.pathExists(`${dir}/src`) //=> false
      )
      .then((exists) => {
        if (exists) return;

        console.log("Build success! -- now 'npm start' to start development");
        return fse.copy('./template/', dir);
      })
      .then(() => {
        createFile(
          `${dir}/src/func/data.js`,
          `export const info = {\n  SITE: '${siteName}',\n  ID: '${experimentId}',\n  VNAME: '${variationName}'\n};\n`
        );
        createFile(expConfigPathe, content);
      })
      .then(() => createFile(
        `${dir}/src/scss/components/_info.scss`,
        `$id: '${siteName}-${experimentId}';\n $variation-name: '${variationName}';`
      )
      )
      .catch((er) => console.error(er));
  });
});
