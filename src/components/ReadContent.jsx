import React from "react";
import * as St from "../styles/styles";

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
