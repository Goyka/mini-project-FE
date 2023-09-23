"use client";
import React, { useState } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";
import ValidInput from "./ValidInput";

/**
 * @author : Won Heo, Goya Gim
 * @includes : Create User info.
 */

export const Register = ({ closeModal, setMainPageKey }) => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const validateUserId = (value) => {
    const regex = /^[a-zA-Z0-9_]{5,}$/;
    return regex.test(value);
  };
  const validatePassword = (value) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(value);
  };
  const validateNickname = (value) => {
    const regex = /\d{4,}/;
    return regex.test(value);
  };
  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 서로 다릅니다.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/users/signup",
        {
          username,
          nickname,
          password,
          email,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("새로운 회원가입이 발생하였습니다 ->", response);

      if (response.status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <St.ModalWrap>
      <St.Modal style={{ height: "600px" }}>
        <>
          <St.Col>
            <p>아이디</p>
            <ValidInput
              type="text"
              name="id"
              value={username}
              handleChange={setUsername}
              handleKeyUp={validateUserId}
              errorMessage={
                "아이디는 5자리 이상이며 영문과 숫자, 특수문자 (@$!%*#?& )가 포함됩니다."
              }
            />
            <p>닉네임</p>
            <ValidInput
              type="text"
              name="nickname"
              value={nickname}
              handleChange={setNickname}
              handleKeyUp={validateNickname}
              errorMessage={
                "닉네임은 4자리 이상이며, 숫자만 사용할 수 있습니다."
              }
            />
            <p>비밀번호</p>
            <ValidInput
              type="password"
              name="password"
              value={password}
              handleChange={setPassword}
              handleKeyUp={validatePassword}
              errorMessage={
                "비밀번호는 8자리 이상이며, 영어 대문자 1개, 특수문자 1개가 포함 되어야 합니다."
              }
            />
            <p>비밀번호 재입력</p>
            <St.Input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              name="passwordConfirm"
              onClick={(e) => e.stopPropagation()}
            />
            {password === passwordConfirm || (
              <St.ErrorMessage>비밀번호가 동일하지 않습니다</St.ErrorMessage>
            )}
            <p>이메일 주소</p>
            <ValidInput
              type="text"
              name="email"
              value={email}
              handleChange={setEmail}
              handleKeyUp={validateEmail}
              errorMessage={
                "example@gmail.com <- 아이디와 도메인을 꼼꼼히 입력해주세요."
              }
            />
          </St.Col>
        </>
        <St.Button onClick={onSubmitHandler} buttontheme="secondary">
          회원가입
        </St.Button>
      </St.Modal>
    </St.ModalWrap>
  );
};
