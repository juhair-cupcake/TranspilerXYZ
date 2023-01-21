# A/B Testing TranspilerXYZ

A/B test webpack 5 boilerplate using Babel, PostCSS and Sass.

## Installation

```
npm i
```

## Start experiment server

```
npm start
```

## Create new experiment

```
npm run new
```

## Build the experiment

```
npm run build
```

## Build the experiment with minified code

```
npm run build-m
```

## Connect experiment with the site

Copy below code in your UserJS/TemperMonkey

```
// ==UserScript==
// @name         TranspilerXYZ
// @description  A/B testing transpiler with HOT reloading script
// @version      69
// @author       LEGEND
// @match        *://*/*
// ==/UserScript==

(() => {
  const sharedBundle = 'http://localhost:3000/shared.bundle.js';
  const jsLocation = 'http://localhost:3000/main.bundle.js';
  const cssLocation = 'http://localhost:3000/styles/main.css';
  const socket = new WebSocket('ws://localhost:3000/ws');
  const fileFetcher = (fileLocation, fileType) => {
    const config = {
      js: {
        id: 'transpilerxyz_script',
        htmlTag: 'script'
      },
      bJs: {
        id: 'transpilerxyz_buildScript',
        htmlTag: 'script'
      },

      css: {
        id: 'transpilerxyz_style',
        htmlTag: 'style'
      }
    };

    fetch(fileLocation)
      .then((response) => {
        return response.text();
      })
      .then((fileData) => {
        const newFile = document.createElement(config[fileType].htmlTag);

        newFile.id = config[fileType].id;
        newFile.textContent = fileData;
        if (fileType === 'css') {
          document.querySelector(`#${config[fileType].id}`)?.remove();
          document.querySelector('head').append(newFile);
          return;
        }
        //console.log(fileData !== document.querySelector(`#${config[fileType].id}`)?.text);
        if (fileData !== document.querySelector(`#${config[fileType].id}`)?.text) {
          document.querySelector(`#${config[fileType].id}`)?.remove();
          document.querySelector('head').append(newFile);
        }
      })
      .catch((err) => {
        console.warn('Something went wrong.', err);
      });
  };
  fileFetcher(sharedBundle, 'bJs');
  //Listen for messages
  socket.addEventListener('message', (event) => {
    if (JSON.parse(event.data).type !== 'ok') return;
    fileFetcher(jsLocation, 'js');
    fileFetcher(cssLocation, 'css');
  });
})();
```
