import { q, insertEle } from '../../../../../../utils/updateEle';
import { expLog } from '../../../../../../utils/others';

export function addContent(ID, base) {
  insertEle(
    base,
    'beforebegin',
    `<div class="${ID}-content">
      someThing will be here...
    </div>`,
    q(`.${ID}-content`)
  );

  expLog(ID, ['content-added']);
}
