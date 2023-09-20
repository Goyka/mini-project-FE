"use client";
import React, { useState } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";

/**
 * @author : Goya Gim
 * @includes : Create Kanban contents and post to the server.
 */

export default function Create({ closeModal, setMainPageKey }) {
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");
  const token = sessionStorage.getItem("token");

  // useEffect(() => {
  //   // 토큰이 없을 시, 접근 인가를 거절
  //   if (!token) {
  //     closeModal();
  //   }
  // }, []);

  const onSaveHandler = async (e) => {
    try {
      const response = await axios.post(
        "/api/post",
        {
          title: createTitle,
          content: createBody,
        },
        config
      );
      e.stopPropagation();
      setCreateTitle(response.data.title);
      setCreateBody(response.data.content);
      closeModal();
      setMainPageKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <St.ModalWrap>
      <St.Modal>
        <>
          <div>
            <h4>게시글 작성하기</h4>
            <span>여러분의 고민을 익명 속에서 자유롭게 !</span>
          </div>
          <input
            type="text"
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="제목"
          />
          <textarea
            value={createBody}
            onChange={(e) => setCreateBody(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </>
        <St.Button onClick={onSaveHandler}> 등록하기 </St.Button>
      </St.Modal>
    </St.ModalWrap>
  );
}
