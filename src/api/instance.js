import axios from "axios";

/**
 * @author : Goya Gim
 * @includes : Create axios instance to protect API keys.
 */

const instance = axios.create({
  baseURL: "https://jaeha0183.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  mode: "cors",
});

export default instance;
