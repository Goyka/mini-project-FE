"use client";
import React, { useState } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";

/**
 * @author : Goya Gim
 * @includes : Create User info.
 */

export const Register = ({ closeModal, setMainPageKey }) => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const usernamePattern = /^[a-zA-Z0-9_]{6,}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!username === usernamePattern) {
      alert("아이디는 영문, 숫자로 구성되어야 하며 6자 이상이어야 합니다.");
    }
    if (!password === passwordPattern) {
      alert(
        "비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 모두 포함하며 8자 이상이어야 합니다."
      );
    }
    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 서로 다릅니다.");
      return;
    }
    try {
      const response = await axios.post("/api/user/signup", {
        username,
        nickname,
        password,
      });
      console.log("새로운 회원가입이 발생하였습니다 ->", response);
      setUsername(response.data.username);
      setNickname(response.data.nickname);
      setPassword(response.data.password);

      if (response.status === 200) {
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
            <h4>회원가입</h4>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="id"
          />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="nickname"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="password"
          />
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="check password"
          />
        </>
        <St.Button onClick={onSubmitHandler} buttontheme="secondary">
          {" "}
          회원가입{" "}
        </St.Button>
      </St.Modal>
    </St.ModalWrap>
  );
};
