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

### HOT socket update

```
// ==UserScript==
// @name         TranspilerXYZ
// @description  A/B testing transpiler with HOT update script
// @version      69
// @author       LEGEND
// @match        *://*/*
// ==/UserScript==

(() => {
  const ID = 'TRANSPILER-XYZ';
  const fType = {
    js: 'script',
    bJs: 'script',
    css: 'style'
  };
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
        const newF = document.createElement(fType[type]);
        const oldF = document.querySelector(`#${ID}-${type}`);

        if (oldF) {
          if (oldF.textContent === fileData) return;

          oldF.remove();
        }

        newF.id = `${ID}-${type}`;
        newF.textContent = fileData;

        document.head.append(newF);
      })
      .catch((err) => {
        console.debug(err);
      });
  };
  pushInDom('http://localhost:3000/shared.bundle.js', 'bJs');

  //Listen Socket reply
  new WebSocket('ws://localhost:3000/ws').addEventListener('message', (event) => {
    if (JSON.parse(event.data).type !== 'ok') return;

    pushInDom('http://localhost:3000/main.bundle.js', 'js');
    pushInDom('http://localhost:3000/styles/main.css', 'css');
  });
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
