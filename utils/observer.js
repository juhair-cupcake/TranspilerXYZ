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

export function iframeClickObs(iFrameTitle, callback) {
  window.focus();
  window.addEventListener('blur', () => {
    setTimeout(() => {
      if (document.activeElement.tagName === 'IFRAME') {
        document.activeElement.title === iFrameTitle && callback();

        setTimeout(() => {
          window.focus();
        }, 10);
      }
    });
  });
}
