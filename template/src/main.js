import { waitForEle } from '../../../../../utils/poolFor';
import { info } from './func/info';
import { otherF } from './func/otherF';

const ID = `${info.SITE}-${info.ID}`;
waitForEle('body', ([base]) => {
  document.body.classList.add(ID);

  otherF(base);
});
