export function mutationObs(
  target,
  callback,
  config = {
    attributes: true,
    childList: true,
    subtree: true
  }
) {
  const observer = new MutationObserver(callback);
  typeof target === 'string'
    ? observer.observe(document.querySelector(target), config)
    : observer.observe(target, config);
}
