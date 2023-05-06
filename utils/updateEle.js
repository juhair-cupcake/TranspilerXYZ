/*eslint-disable no-underscore-dangle*/

export function _q(a, b) {
  const x = b ? a.querySelectorAll(b) : document.querySelectorAll(a);
  return x.length > 1 ? x : x[0];
}
export function q(s, o) {
  return o ? s.querySelector(o) : document.querySelector(s);
}
export function qa(s, o) {
  return o ? s.querySelectorAll(o) : document.querySelectorAll(s);
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
