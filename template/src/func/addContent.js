import { log } from '../../../../../../utils/others';
import { qa } from '../../../../../../utils/selectEle';

export function addContent(base) {
  qa('a').forEach((element) => {
    log(`${base} => ${element}`);
  });
}
