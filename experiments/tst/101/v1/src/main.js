import { setExpInfo } from '../../../../../utils/others';
import { waitFor } from '../../../../../utils/poolFor';
import { q } from '../../../../../utils/updateEle';
import { addContent } from './func/addContent';
import { info } from './func/data';

const ID = `${info.SITE}-${info.ID}`;
waitFor(
  () => q('body'),
  (base) => {
    addContent(ID, base);

    q('body').classList.add(ID);
    setExpInfo(ID, 'Variation 1', '__________');
  }
);

/*************************************************************
try to use ES module instead of commonJS module
*************************************************************/
