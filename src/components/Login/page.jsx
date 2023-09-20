"use client";

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!id) {
      errors.username = "사용자 이름을 입력하세요.";
    }

    if (!password) {
      errors.password = "비밀번호를 입력하세요.";
    }

    return errors;
  };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/body", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.message, response);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // 여기에서 서버로 로그인 요청을 보내는 코드를 작성하기!.
        const response = await axios.post("http://localhost:4000/body", {
          id,
          password,
        });

        console.log(response.statusText, response);
        if (response.status === 201) {
          checkUser();
        }

        // 로그인이 성공하면 다음 페이지로 이동
      } catch (error) {
        console.error("로그인 에러:", error);
        // 로그인 실패 시 띄울 수 있는 오류메세지.
        setErrors({
          general:
            "로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하세요.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <LoginContainer>
      <LoginHeader>
        <LoginTitle></LoginTitle>
      </LoginHeader>
      <LoginBody>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              name="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {errors.general && <p className="error">{errors.general}</p>}
          <button type="submit">로그인</button>
          <button type="submit">회원가입</button>
          <button type="submit">카카옼</button>
        </form>
      </LoginBody>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginHeader = styled.header``;

const LoginTitle = styled.h4`
  font-weight: 700;
`;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default login;
