import { setExpInfo } from '../../../../../utils/others';
import { waitFor } from '../../../../../utils/poolFor';
import { q } from '../../../../../utils/updateEle';
import { addContent } from './func/addContent';
//import { info } from './func/data';

//const ID = `${info.SITE}-${info.ID}`;
const ID = 'TEST-101';

waitFor(
  () => q('body'),
  (base) => {
    addContent(ID, base);

    q('body').classList.add(ID);
    setExpInfo(ID, 'Variation 1', 'Juhair Islam');
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
