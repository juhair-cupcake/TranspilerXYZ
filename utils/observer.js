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

//under development
//https://gomakethings.com/fixing-safaris-back-button-browser-cache-issue-with-vanilla-js/
export function backCashObs(callback) {
  window.onpageshow = (event) => {
    if (event.persisted) {
      callback(event);
    }
  };
}
export function xmlObserver(callback) {
  new PerformanceObserver((l) => {
    l.getEntries().forEach((entry) => {
      entry.initiatorType === 'xmlhttprequest' && callback(entry);
    });
  }).observe({
    entryTypes: ['resource']
  });
}
//alpha
export function updfetchEvent() {
  (function (ns, fetch) {
    if (typeof fetch !== 'function') return;
    ns.fetch = function () {
      const out = fetch.apply(this, arguments);

      //side-effect
      out.then(({ ok }) => {
        if (window.fetchOutPut) {
          window.fetchOutPut.push(arguments);
        } else {
          window.fetchOutPut = [];
          window.fetchOutPut.push(arguments);
        }
      });

      //return the old thing
      return out;
    };
  })(window, window.fetch);
}
