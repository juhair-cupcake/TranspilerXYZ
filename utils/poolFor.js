export function waitFor(condition, callback, persistent = false, endTime = 10000, pollInterval = 25) {
  const startTime = new Date();
  (function poll() {
    if (condition) {
      callback();
    } else {
      persistent && setTimeout(poll, pollInterval);
      !persistent && ((new Date() - startTime) < endTime) && setTimeout(poll, pollInterval);
    }
  }());
}
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
