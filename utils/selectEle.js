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
