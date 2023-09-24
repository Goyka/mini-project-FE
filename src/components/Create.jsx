"use client";
import React, { useState } from "react";
import axios from "../api/instance";
import * as St from "../styles/styles";
import { getToken } from "@/util/token";

/**
 * @author : Goya Gim
 * @includes : Create Kanban contents and post to the server.
 */

export default function Create({ closeModal }) {
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");
  const token = getToken();

  const onSaveHandler = async (e) => {
    try {
      const res = await axios.post(
        "/api/posts",
        {
          title: createTitle,
          content: createBody,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      e.stopPropagation();
      if (res.status === 200) {
        setCreateTitle(res.data.data.content.title);
        setCreateBody(res.data.data.content.content);
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
          <div>
            <h4>게시글 작성하기</h4>
          </div>
          <St.Input
            type="text"
            name="title"
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="제목"
          />
          <St.Input
            type="text"
            name="body"
            value={createBody}
            onChange={(e) => setCreateBody(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="내용"
            style={{ height: "70px", marginBottom: "15px" }}
          />
        </>
        <St.Button onClick={onSaveHandler} buttontheme="primary">
          등록하기
        </St.Button>
      </St.Modal>
    </St.ModalWrap>
  );
}
