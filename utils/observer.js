/*eslint-disable wrap-iife */
/*eslint-disable no-unused-vars */
/*eslint-disable func-names */
/*eslint-disable prefer-rest-params */
/*eslint-disable no-param-reassign*/
export function mutationObs(
  target,
  callback,
  config = {
    //attributeFilter: ['style', 'class']
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

export function backCashObs(callback) {
  window.addEventListener('pageshow', (e) => e.persisted && callback(e));
  /*
  https://gomakethings.com/fixing-safaris-back-button-browser-cache-issue-with-vanilla-js/
  window.onpageshow = (event) => {
    if (event.persisted) {
      callback(event);
    }
  };
  */
}
//under development
export function xmlObserver(callback) {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      entry.initiatorType === 'xmlhttprequest' && callback(entry);
    });
  }).observe({
    entryTypes: ['resource']
  });
}
