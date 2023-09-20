"use client";

import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const usernamePattern = /^[a-zA-Z0-9_]{6,}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!formData.username.match(usernamePattern)) {
      errors.username =
        "아이디는 영문, 숫자, _로 구성되어야 하며 6자 이상이어야 합니다.";
    }

    if (!formData.password.match(passwordPattern)) {
      errors.password =
        "비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 모두 포함하며 8자 이상이어야 합니다.";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // 여기에서 서버로 회원가입 요청을 보내는 코드를 작성!!
        const response = await axios.post(
          "http://localhost:4000/body",
          formData
        );

        // 회원가입이 성공하면 다음 페이지로 이동...
      } catch (error) {
        console.error("회원가입 에러:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>닉네임</label>
          <input
            type="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>아이디</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Signup;
