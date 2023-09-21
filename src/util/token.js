/**
 * @author : Goya Gim
 */

export const setToken = (token) => {
  sessionStorage.setItem("Authorization", token);
};

export const getToken = () => {
  return sessionStorage.getItem("Authorization");
};
