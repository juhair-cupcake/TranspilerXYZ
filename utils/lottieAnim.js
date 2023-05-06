export function addLottie(dataURL, target, position) {
  if (!document.getElementById('lottieAnimationScript')) {
    const lottieScript = document.createElement('script');
    lottieScript.id = 'lottieAnimationScript';
    lottieScript.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';

    document.head.insertAdjacentElement('beforeEnd', lottieScript);
  }

  const playerScript = document.createElement('lottie-player');
  playerScript.src = dataURL;
  playerScript.loop = true;
  playerScript.autoplay = true;

  target.insertAdjacentElement(position, playerScript);
}
