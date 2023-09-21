import axios from "../api/instance";
import { getToken } from "./token";

export const clearToken = async () => {
  const token = getToken();

  try {
    const response = await axios.get("/api/user/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      sessionStorage.clear();
      console.log("토큰이 제거되었습니다 ->", response);
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};
