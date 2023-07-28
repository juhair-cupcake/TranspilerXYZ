import { q, insertEle } from '../../../../../../utils/updateEle';

export function addContent(ID, base) {
  insertEle(
    base,
    'beforebegin',
    `<div class="${ID}-content">
      someThing will be here...
    </div>`,
    q(`.${ID}-content`)
  );
}
