"use client";
import React, { useState } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";
import ValidInput from "./ValidInput";

/**
 * @author : Won Heo, Goya Gim
 * @includes : Create User info.
 */

export const Register = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [valNumber, setValNumber] = useState("");
  const [isVal, setIsVal] = useState(false);

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
    const regex = /^[가-힣]{3,}$/;
    return regex.test(value);
  };
  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  };
  const validateCode = (value) => {
    const regex = /^.{1,300}$/;
    return regex.test(value);
  };

  const onVerifiedEmail = async () => {
    // response로 받은 인증번호가 생성되었던 인증번호와 다르면 회원가입 통신 X
    try {
      const response = await axios.post(
        "/api/users/emailsend",
        {
          email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // input으로 사용자에게 인증번호를 입력 받아 비교해 분기해야 함
      if (response.status === 200) {
        console.log("이메일 인증->>", response.data);
        setIsCodeSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onVerifiedCode = async () => {
    try {
      const response = await axios.post(
        "/api/users/emailVerification",
        {
          email,
          authCode: valNumber,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        console.log(response.data.data);
        if (response.data.data.verified === true) {
          setIsVal(true);
          setIsCodeSent(false);
        }
      } else {
        alert("인증번호가 맞지 않습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = async () => {
    try {
      const response = await axios.post(
        "/api/users/signup",
        {
          username,
          nickname,
          password,
          email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <St.Modal
      style={{ width: "700px", height: "300px", paddingBottom: "40px" }}
    >
      <>
        <St.Button
          onClick={closeModal}
          style={{
            backgroundColor: "white",
            position: "relative",
            top: "-3px",
            right: "-333px",
            width: "40px",
          }}
        >
          ✖︎
        </St.Button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "48%",
          }}
        >
          <St.Col
            style={{ width: "48%", marginRight: "20px", marginLeft: "-20px" }}
          >
            <div>아이디</div>
            <ValidInput
              type="text"
              name="id"
              value={username}
              handleChange={setUsername}
              handleKeyUp={validateUserId}
              errorMessage={"아이디는 5자리 이상이며 영문과 숫자가 포함됩니다."}
            />
            <div>비밀번호</div>
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
            <div>비밀번호 재입력</div>
            <St.Input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              name="passwordConfirm"
              onClick={(e) => e.stopPropagation()}
            />
            {password === passwordConfirm || (
              <St.ErrorMessage>비밀번호가 동일하지 않습니다</St.ErrorMessage>
            )}
          </St.Col>
          <St.Col style={{ width: "48%", marginLeft: "40px" }}>
            <div>닉네임</div>
            <ValidInput
              type="text"
              name="nickname"
              value={nickname}
              handleChange={setNickname}
              handleKeyUp={validateNickname}
              errorMessage={
                "닉네임은 3자리 이상이며, 한글 닉네임만 사용 가능합니다."
              }
            />
            <div>이메일 주소</div>
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
            {!isCodeSent ? (
              <></>
            ) : (
              <>
                <div>이메일 인증번호 입력</div>
                <ValidInput
                  type="text"
                  name="valNumber"
                  value={valNumber}
                  handleChange={setValNumber}
                  handleKeyUp={validateCode}
                  errorMessage={
                    "입력한 이메일 주소로 발송된 인증번호를 5분 이내로 입력해주세요."
                  }
                />
              </>
            )}
          </St.Col>
        </div>
      </>
      {!isVal ? (
        <>
          {!isCodeSent && (
            <St.Button
              onClick={onVerifiedEmail}
              buttontheme="secondary"
              style={{ border: "2px solid red" }}
            >
              이메일 인증
            </St.Button>
          )}
          {isCodeSent && (
            <St.Button
              onClick={onVerifiedCode}
              buttontheme="secondary"
              style={{ border: "2px solid green" }}
            >
              인증번호
            </St.Button>
          )}
        </>
      ) : (
        <>
          <St.Button onClick={onSubmitHandler} buttontheme="primary">
            회원가입
          </St.Button>
        </>
      )}
    </St.Modal>
  );
};
