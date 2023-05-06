export function getCookie(cookieName) {
  const regex = new RegExp(`(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`);
  const match = document.cookie.match(regex);
  return match ? match[2] : false;
}

export function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || true}${expires}; path=/`;
}
