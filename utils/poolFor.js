export const waitForEle = (
  waitFor,
  callback,
  minElements = 1,
  isVariable = false,
  timer = 10000,
  frequency = 25
) => {
  const elements = isVariable ? window[waitFor] : document.querySelectorAll(waitFor);
  if (timer <= 0) return;
  (!isVariable && elements.length >= minElements) ||
  (isVariable && typeof window[waitFor] !== 'undefined')
    ? callback(elements)
    : setTimeout(
        () => waitForEle(waitFor, callback, minElements, isVariable, timer - frequency),
        frequency
      );
};
