"use client";

import React from "react";
import * as St from "../styles/styles";
import { useRouter } from "next/navigation";

/**
 * @author : Goya Gim
 */

export function Kanban({ id, title, nickname }) {
  const router = useRouter();
  const postId = id;
  return (
    <>
      <St.Box
        onClick={() => {
          router.push(`/posts/${postId}`);
        }}
      >
        <h4>{title}</h4>
        <span>{nickname}</span>
        <br />
        <span>♥︎ / 💬</span>
      </St.Box>
    </>
  );
}
