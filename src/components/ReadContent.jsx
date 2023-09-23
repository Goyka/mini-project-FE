"use client";
import React from "react";
import * as St from "@/styles/styles";
import { useRouter } from "next/navigation";

/**
 * @author : Kwonyeong Kang, Goya Gim
 * @includes : Create component for read/[id] page.
 */

const ReadContent = ({ nickname, title, content }) => {
  const router = useRouter();

  return (
    <St.ContentBox>
      <span
        onClick={() => router.back()}
        style={{ cursor: "pointer", fontSize: "30px", color: "#00ccd8" }}
      >
        «
      </span>
      <h4>{title}</h4>
      <span>{nickname}</span>
      <br />
      <span>♥︎ / 💬</span>
      <p>{content}</p>
    </St.ContentBox>
  );
};

export default ReadContent;
