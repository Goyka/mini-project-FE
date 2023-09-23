export default function isUserFit() {
  const jwtToken = localStorage.getItem("Authorization");
  const tokenParts = jwtToken.split(".");
  const encodedPayload = tokenParts[1];
  const decodedPayload = atob(encodedPayload);
  const jwtData = JSON.parse(decodedPayload);
  const nickname = jwtData.nickname;

  return nickname;
}
