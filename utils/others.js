/*eslint-disable no-ex-assign */
/*eslint-disable no-unused-expressions */
/*eslint-disable no-param-reassign */
/*eslint-disable object-curly-newline */
export function addCss(position, css) {
  const styles = document.createElement('style');
  styles.setAttribute('type', 'text/css');
  position.appendChild(styles).textContent = css;
}

export function signAfter3Digit(stringNum, sign) {
  return stringNum.replace(/\B(?=(\d{3})+(?!\d))/g, sign);
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function expLog(ID, logData) {
  try {
    window.runningExperiment[ID].log.push(logData);
  } catch (e) {
    e = '';
  }
  console.debug(logData);
}
export function setExpInfo(ID, vName, tName) {
  window.runningExperiment = window.runningExperiment || {};

  try {
    window.runningExperiment[ID].variation;
  } catch (e) {
    window.runningExperiment[ID] = {
      variation: vName,
      name: tName,
      log: []
    };
  }
  expLog(ID, `${ID} is running`);
}
