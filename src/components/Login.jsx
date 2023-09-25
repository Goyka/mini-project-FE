"use client";
import { useState } from "react";
import axios from "../api/instance";
import { setToken } from "@/util/token";
import { Register } from "./Register";
import * as St from "../styles/styles";
import { useRouter } from "next/navigation";

/**
 * @author : Won Heo, Goya Gim
 * @includes : Makes login function based on server data.
 */

export default function Login({ closeModal }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
          <St.Button
            onClick={closeModal}
            style={{
              backgroundColor: "white",
              position: "relative",
              top: "-50px",
              right: "-180px",
              width: "40px",
            }}
          >
            ✖︎
          </St.Button>
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
        <St.ModalWrap>
          <St.Modal>
            <Register closeModal={closeRegisterModal} />
          </St.Modal>
        </St.ModalWrap>
      )}
    </St.ModalWrap>
  );
}
