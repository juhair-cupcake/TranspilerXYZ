import { log } from '../../../../../../utils/others';
import { qa } from '../../../../../../utils/selectEle';

export function otherF(pass) {
  qa('a').forEach((element) => {
    log(`${pass} => ${element}`);
  });
}
