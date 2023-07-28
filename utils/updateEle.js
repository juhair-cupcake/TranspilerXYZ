/*eslint-disable no-confusing-arrow */
/*eslint-disable no-underscore-dangle*/

export const q = (a, b) => (b ? a.querySelector(b) : document.querySelector(a));
export const qa = (a, b) => (b ? a.querySelectorAll(b) : document.querySelectorAll(a));
export const ql = (a, b) => {
  if (b) return a.querySelectorAll(b)[a.querySelectorAll(b).length - 1];
  return document.querySelectorAll(a)[document.querySelectorAll(a).length - 1];
};
export function q_(a, b) {
  const x = b ? a.querySelectorAll(b) : document.querySelectorAll(a);
  return x.length > 1 ? x : x[0];
}
export function insertEle(target, position, element, checkEle) {
  if (!checkEle) {
    typeof element === 'string'
      ? target.insertAdjacentHTML(position, element)
      : target.insertAdjacentElement(position, element);
  }
}
export function removeAllAtr(element) {
  while (element.attributes.length > 0) {
    element.removeAttribute(element.attributes[0].name);
  }
}
