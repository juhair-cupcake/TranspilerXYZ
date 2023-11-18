import { waitFor } from '../../../../../utils/poolFor';
import { q } from '../../../../../utils/updateEle';
import { info } from './func/data';

const ID = `${info.SITE}-${info.ID}`;
waitFor(
  () => q('body'),
  (base) => {
    q('body').classList.add(ID);
  }
);

/*************************************************************
try to use ES module instead of commonJS module
*************************************************************/
