"use client";
import { useState, useEffect } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";
import { getToken, setToken } from "@/util/token";
import { Register } from "./Register";

/**
 * @author : Goya Gim
 * @includes : Makes login function based on server data.
 */

export default function Login({ closeModal, setMainPageKey }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const openRegisterModal = (e) => {
    e.stopPropagation();
    setIsRegisterOpen(true);
  };
  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const checkUser = async () => {
    try {
      const response = await axios.get("/api/user/login", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response.data.message, response);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };
  const onLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });
      e.stopPropagation();
      console.log(response.statusText, response);
      // console.log(response.config.data);

      if (response.status === 200) {
        setToken(response.data.token);
        checkUser();
        closeModal();
        setMainPageKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <St.ModalWrap>
      <St.Modal>
        <>
          <div>
            <h4>로그인</h4>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="id"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="password"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <St.Button onClick={onLoginHandler} buttontheme="primary">
              로그인
            </St.Button>
            <St.Button onClick={openRegisterModal} buttontheme="secondary">
              회원가입
            </St.Button>
          </div>
        </>
      </St.Modal>
      {isRegisterOpen && (
        <St.ModalWrap
          onClick={isRegisterOpen ? closeRegisterModal : undefined}
          disableBackground
        >
          <St.Modal>
            <Register closeModal={closeModal} setMainPageKey={setMainPageKey} />
          </St.Modal>
        </St.ModalWrap>
      )}
    </St.ModalWrap>
  );
}
