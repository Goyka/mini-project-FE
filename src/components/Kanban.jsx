"use client";

import React from "react";
import * as St from "../app/styles";
import { useRouter } from "next/navigation";

export function Kanban({ id, title }) {
  const router = useRouter();
  return (
    <>
      <St.Box
        onClick={() => {
          router.push(`/detail/${id}`);
        }}
      >
        <span>게시글 성격</span>
        <h4>{title}</h4>
        <span>좋아요 / 코멘트 아이콘</span>
      </St.Box>
    </>
  );
}
