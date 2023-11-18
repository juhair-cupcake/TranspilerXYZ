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

//https://gomakethings.com/fixing-safaris-back-button-browser-cache-issue-with-vanilla-js/
export function backCashObs(callback) {
  window.addEventListener('pageshow', (e) => e.persisted && callback(e));
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

/*
//target after on View Port
const activate = () => {
  console.debug(true);
};
function waitFor(t, i, o = !1, a = 1e4, e = 25) { a < 0 || (t() ? i() : setTimeout(() => { o && waitFor(t, i, o, a, e); o || waitFor(t, i, o, a - e, e); }, e)); }

const targetList = [
  '.elementor-element-1aee2fde.elementor-hidden-desktop',
  '.elementor-element-5de72566.elementor-hidden-mobile'
];
const breakPoint = 786;
const singleActivation = () => {
  if (!window.glo82AlreadyActivated) {
    window.glo82AlreadyActivated = true;
    activate();
  }
};
const bottomOverScreen = (targetQ) => {
  return document.querySelector(targetQ).getBoundingClientRect().bottom < window.innerHeight + 50;
};
const checkIsActive = () => {
  window.innerWidth < breakPoint && bottomOverScreen(targetList[0])
    ? singleActivation()
    : window.innerWidth >= breakPoint && bottomOverScreen(targetList[1]) && singleActivation();
};
waitFor(
  () => document.querySelectorAll(targetList.join(', ')).length > 1,
  () => {
    checkIsActive();
    window.addEventListener('scroll', () => {
      checkIsActive();
    });
  }
);
*/
