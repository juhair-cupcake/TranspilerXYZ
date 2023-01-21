import { waitForEle } from '../../../../../utils/poolFor';
//import { info } from './func/info';
import { otherF } from './func/otherF';

//const ID = `${info.SITE}-${info.ID}`;
const ID = 'TEST-101';

waitForEle('body', ([base]) => {
  document.body.classList.add(ID);

  otherF(base);
});

/*************************************************************
# Need to change some thing :o
  - uncomment line 2 & 5
  - remove ID(old one) line:6
  - in func/info.js
    - uncomment line:1
    - remove line:2
*************************************************************/
