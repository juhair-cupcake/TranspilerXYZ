import { waitFor } from '../../../../../utils/poolFor';
import { q } from '../../../../../utils/updateEle';
//import { info } from './func/data';
import { addContent } from './func/addContent';

//const ID = `${info.SITE}-${info.ID}`;
const ID = 'TEST-101';

/*
  Main 👑 JS code starts 👇
  wait 😴 before ⌛ the site is ready👍!
*/
waitFor(
  () => q('body'),
  (base) => {
    q('body').classList.add(ID);

    addContent(ID, base);
  }
);

/*************************************************************
# Need to change some thing :o
  - uncomment line 2 & 5
  - remove ID(old one) line:6
  - in func/data.js
    - uncomment line:1
    - remove line:2
#

try {
} catch (error) {
  console.debug(error);
}
*************************************************************/
