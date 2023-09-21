import axios from "axios";

/**
 * @author : Goya Gim
 * @includes : Create axios instance to protect API keys.
 */

const instance = axios.create({
  baseURL: "http://54.180.123.127:8080/",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

export default instance;
