/*eslint-disable default-param-last */
const fs = require('fs');
const chalk = require('chalk');
const defaults = require('./experimentConfig');

//new-changes
const sharedJsContent = (siteName, experimentId, variationName) => `module.exports = {
  SITE: '${siteName}',
  ID: '${experimentId}',
  VNAME: '${variationName}'
};`;

const { SITE, ID, VNAME } = defaults;

const coolColor = chalk.bold.black.bgGreenBright;
const createExpSchema = {
  properties: {
    siteName: {
      description: coolColor('Website/Experiment name(short)'),
      require: true,
      default: SITE
    },
    experimentId: {
      description: coolColor('ID no'),
      require: true,
      default: ID
    },
    variationName: {
      description: coolColor('Variation name'),
      require: true,
      default: VNAME
    }
  }
};
const createFile = (location, content) => {
  fs.writeFile(location, content, (err) => {
    if (err) {
      console.error('ERROR', err);
    }
    //file written successfully
  });
};

module.exports = {
  sharedJsContent,
  createFile,
  createExpSchema
};
