"use client";

export const setToken = (token) => {
  localStorage.setItem("Authorization", token);
};

export const getToken = (token) => {
  return localStorage.getItem("Authorization", token);
};
