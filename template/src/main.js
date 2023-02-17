import { waitForEle } from '../../../../../utils/poolFor';
//import { info } from './func/info';
import { addContent } from './func/addContent';

//const ID = `${info.SITE}-${info.ID}`;
const ID = 'TEST-101';

/*
  Main 👑 JS code starts 👇
  wait 😴 before ⌛ the site is ready👍!
*/
waitForEle('body', ([base]) => {
  document.body.classList.add(ID);

  addContent(base);
});

/*************************************************************
# Need to change some thing :o
  - uncomment line 2 & 5
  - remove ID(old one) line:6
  - in func/info.js
    - uncomment line:1
    - remove line:2
*************************************************************/

/*
try {
} catch (error) {
  console.debug(error);
}
*/
