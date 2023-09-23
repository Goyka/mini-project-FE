"use client";
import { useState } from "react";
import axios from "../api/instance";

import { setToken } from "@/util/token";
import { Register } from "./Register";
import * as St from "../styles/styles";

/**
 * @author : Won Heo, Goya Gim
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
  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", {
        username,
        password,
      });
      e.stopPropagation();

      if (res.status === 200) {
        setToken(res.headers.authorization);
        closeModal();
        window.location.reload();
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
            <St.Button
              onClick={openRegisterModal}
              setmainpagekey={setMainPageKey}
              buttontheme="secondary"
            >
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
