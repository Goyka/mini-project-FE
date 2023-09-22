export const setToken = (token) => {
  localStorage.setItem("Authorization", token);
};

export const getToken = () => {
  return localStorage.getItem("Authorization");
};
