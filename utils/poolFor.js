/*eslint-disable no-undef*/
export function waitForEle(
  waitFor,
  callback,
  minElements = 1,
  isVariable = false,
  timer = 10000,
  frequency = 25
) {
  const elements = isVariable ? window[waitFor] : document.querySelectorAll(waitFor);
  if (timer <= 0) return;
  (!isVariable && elements.length >= minElements) ||
  (isVariable && typeof window[waitFor] !== 'undefined')
    ? callback(elements)
    : setTimeout(
        () => waitForEle(waitFor, callback, minElements, isVariable, timer - frequency),
        frequency
      );
}

export function pollForGA(ID, category, action, label) {
  window.ga = window.ga || [];
  ga('create', ID);
  if (window.ga !== undefined) {
    ga('send', 'event', {
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    });
  } else {
    setTimeout(() => pollForGA(ID, category, action, label), 25);
  }
}

export function pollForGAEvent(category, action, label) {
  ga.getAll()[0]
    ? ga.getAll()[0].send('event', category, action, label)
    : setTimeout(() => pollForGAEvent(category, action, label), 25);
}

export function pollForText(waitFor, callback, elementNo = 0, timer = 10000, frequency = 25) {
  const elements = document.querySelectorAll(waitFor);
  if (timer <= 0) return;
  elements[elementNo] && elements[elementNo].innerText
    ? callback(elements)
    : setTimeout(
        () => pollForText(waitFor, callback, elementNo, timer - frequency, frequency),
        frequency
      );
}
