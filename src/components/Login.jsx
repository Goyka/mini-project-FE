"use client";
import { useState, useEffect } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";
import { getToken, setToken } from "@/util/token";
import { Register } from "./Register";

/**
 * @author : Won Heo, Goya Gim
 * @includes : Makes login function based on server data.
 */

export default function Login({ closeModal }) {
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
      const response = await axios.get("/api/users/login", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      console.log("유저 인증 ->", response);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };
  const onLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      e.stopPropagation();
      console.log("로그인 요청 ->", response);

      if (response.status === 200) {
        setToken(response.headers.authorization);
        checkUser();
        window.location.reload();
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <St.ModalWrap>
      <St.Modal>
        <>
          <St.Input
            type="text"
            name="id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="id"
          />
          <St.Input
            type="password"
            name="password"
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
        <St.ModalWrap onClick={isRegisterOpen ? closeRegisterModal : undefined}>
          <St.Modal>
            <Register closeModal={closeModal} />
          </St.Modal>
        </St.ModalWrap>
      )}
    </St.ModalWrap>
  );
}
