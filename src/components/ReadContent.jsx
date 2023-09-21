"use client";
import React from "react";
import * as St from "@/styles/styles";

/**
 * @author : Kwonyeong Kang, Goya Gim
 * @includes : Create component for read/[id] page.
 */

const ReadContent = ({ nickname, title, content }) => {
  return (
    <St.ContentBox>
      <h4>{title}</h4>
      <span>{nickname}</span>
      <br />
      <span>♥︎ / 💬</span>
      <p>{content}</p>
    </St.ContentBox>
  );
};

export default ReadContent;
