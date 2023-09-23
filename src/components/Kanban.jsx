"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as St from "../styles/styles";

export function Kanban({ id, title, nickname, isTokenIn, commentLength }) {
  const router = useRouter();
  const postId = id;

  useEffect(() => {
    router.prefetch(`/posts/${postId}`);
  }, [router]);

  return (
    <>
      <St.Box
        onClick={() => {
          if (isTokenIn) {
            router.push(`/posts/${postId}`);
          } else {
            alert("게시글 조회를 위해 로그인을 부탁드립니다.");
          }
        }}
      >
        <div
          style={{
            backgroundColor: "#00ccd8",
            textAlign: "center",
            fontSize: "15px",
            boxSizing: "border-box",
            paddingTop: "3px",
            height: "23px",
            borderRadius: "20px",
          }}
        >
          {nickname}
        </div>
        <h4
          style={{
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          {title}
        </h4>
        <div
          style={{
            color: "#00ccd8",
            textAlign: "center",
            boxSizing: "border-box",
            padding: "1px",
            fontWeight: "600",
          }}
        >
          Comments ⚑ {commentLength}
        </div>
      </St.Box>
    </>
  );
}
