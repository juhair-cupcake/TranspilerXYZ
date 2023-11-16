# A/B Testing TranspilerXYZ

A/B test webpack 5 boilerplate using Babel, PostCSS and Sass.

## Installation

```
npm i
```

### Create new experiment

```
npm run new
```

### Start experiment server

```
npm start
```

### Build the experiment

```
npm run build
```

Minified JS code

```
npm run build-m
```

## ESLint check

By default it's turned off, to open the check go to `.eslintrc` and remove `"*"` from `"ignorePatterns"` on line no `2`

## Connect experiment with the site

Copy below code in your UserJS/TemperMonkey

### HOT socket update

```
// ==UserScript==
// @name         TranspilerXYZ
// @description  A/B testing transpiler with HOT socket update script
// @version      69
// @author       LEGEND
// @match        *://*/*
// ==/UserScript==

(() => {
  const sharedBundle = 'http://localhost:3000/shared.bundle.js';
  const jsLocation = 'http://localhost:3000/main.bundle.js';
  const cssLocation = 'http://localhost:3000/styles/main.css';
  const socket = new WebSocket('ws://localhost:3000/ws');
  console.debug(
    `%c~TRANSPILER-XYZ~`,
    'text-align: center; font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
  );

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
        if (fileData !== document.querySelector(`#${config[fileType].id}`)?.text) {
          document.querySelector(`#${config[fileType].id}`)?.remove();
          document.querySelector('head').append(newFile);
        }
      })
      .catch((err) => {
        console.debug('Something went wrong.', err);
      });
  };
  fileFetcher(sharedBundle, 'bJs');
  socket.addEventListener('message', (event) => {
    if (JSON.parse(event.data).type !== 'ok') return;
    fileFetcher(jsLocation, 'js');
    fileFetcher(cssLocation, 'css');
  });
})();
```

### No socket

```
// ==UserScript==
// @name         TranspilerXYZ
// @description  A/B testing transpiler with static script
// @version      69
// @author       LEGEND
// @match        *://*/*
// ==/UserScript==

(() => {
  const ID = 'TRANSPILER-XYZ';
  console.debug(
    `%c~${ID}~`,
    'text-align: center; font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
  );

  const pushInDom = (link, type) => {
    fetch(link)
      .then((response) => {
        return response.text();
      })
      .then((fileData) => {
        const newF = document.createElement(type);
        newF.classList.add(ID);
        newF.textContent = fileData;
        document.head.append(newF);
      })
      .catch((err) => {
        console.debug(err);
      });
  };

  pushInDom('http://localhost:3000/styles/main.css', 'style');
  pushInDom('http://localhost:3000/shared.bundle.js', 'script');
  pushInDom('http://localhost:3000/main.bundle.js', 'script');
})();
```

### Other Helper Function

```
window.q = (a, b) => {
  const x = b ? a.querySelectorAll(b) : document.querySelectorAll(a);
  return x.length > 1 ? x : x[0];
};
window.rm = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
  localStorage.clear();
  sessionStorage.clear();

  setTimeout(() => {
    window.location.reload();
  }, 1);
};
```
