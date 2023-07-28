/*eslint-disable no-undef*/
export function waitFor(condition, callback, endTime = 10000, pollInterval = 25) {
  if (condition()) {
    callback(condition());
  } else if (endTime > 0) {
    setTimeout(() => {
      waitFor(condition, callback, endTime - pollInterval, pollInterval);
    }, pollInterval);
  }
}
export function waitForEle(
  target,
  callback,
  minElements = 1,
  isVariable = false,
  timer = 10000,
  frequency = 25
) {
  const elements = isVariable ? window[target] : document.querySelectorAll(target);
  if (timer <= 0) return;
  (!isVariable && elements.length >= minElements) ||
  (isVariable && typeof window[target] !== 'undefined')
    ? callback(elements)
    : setTimeout(
        () => waitForEle(target, callback, minElements, isVariable, timer - frequency),
        frequency
      );
}
export function pollForText(target, callback, elementNo = 0, timer = 10000, frequency = 25) {
  const elements = document.querySelectorAll(target);
  if (timer <= 0) return;
  elements[elementNo] && elements[elementNo].innerText
    ? callback(elements)
    : setTimeout(
        () => pollForText(target, callback, elementNo, timer - frequency, frequency),
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

export function triggerEvents(
  element,
  eventNames = ['touchstart', 'mousedown', 'click', 'mouseup', 'touchend']
) {
  const createEvent = (el, type) => {
    if ('createEvent' in document) {
      const event = document.createEvent('events');
      event.initEvent(type, true, false);
      el.dispatchEvent(event);
    } else {
      const event = new Event(type);
      el.dispatchEvent(event);
    }
  };
  setTimeout(() => {
    eventNames.forEach((name) => {
      createEvent(element, name);
    });
  }, 1);
}
