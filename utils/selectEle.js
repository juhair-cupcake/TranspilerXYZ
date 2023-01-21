export const q = (s, o) => {
  return o ? s.querySelector(o) : document.querySelector(s);
};
export const qa = (s, o) => {
  return o ? s.querySelectorAll(o) : document.querySelectorAll(s);
};
