/*eslint-disable no-param-reassign*/
export function mutationObs(
  target,
  callback,
  config = {
    attributes: true,
    childList: true,
    subtree: true
  }
) {
  if (typeof target === 'string') target = document.querySelector(target);
  new MutationObserver(callback).observe(target, config);
}
