export default function isUserFit() {
  function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  const jwtToken = localStorage.getItem("Authorization");
  const tokenParts = jwtToken.split(".");
  const encodedPayload = tokenParts[1];
  const decodedPayload = atou(encodedPayload);
  const jwtData = JSON.parse(decodedPayload);
  const nickname = jwtData.nickname;

  return nickname;
}
