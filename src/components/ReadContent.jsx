"use client";
import React, { useEffect, useState } from "react";
import axios from "@/api/instance";
import { useRouter } from "next/navigation";

import moment from "moment";
import { getToken } from "@/util/token";
import * as St from "@/styles/styles";
/**
 * @author : Kwonyeong Kang, Goya Gim
 * @includes : Create component for read/[id] page.
 */

const ReadContent = ({
  id,
  nickname,
  title,
  content,
  commentsList,
  userNickname,
}) => {
  const [comment, setComment] = useState("");

  const [commentBody, setCommentBody] = useState();
  // 수정하려는 댓글의 ID 값 저장을 위한 State 추기
  const [commentId, setCommentId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const token = getToken();
  const formatDate = (isoDate) => {
    return moment(isoDate).format("YYYY.MM.DD HH:mm");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const toggleAndSetCommentId = (commentId, commentBody) => {
    setIsEditing(!isEditing);
    setCommentId(commentId);
    setCommentBody(commentBody);
  };

  const postComment = async () => {
    try {
      const res = await axios.post(
        `api/posts/${id}/comments`,
        { comment },
        { headers: { Authorization: `${token}` } }
      );
      if (comment !== "" && res.status === 200) {
        setComment(res.data.data.comment);
        setComment("");
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`/api/posts/${id}/comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateComment = async () => {
    try {
      const res = await axios.put(
        `/api/posts/${id}/comments/${commentId}`,
        { comment: commentBody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <St.ContentBox>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          width: "320px",
        }}
      >
        <span
          onClick={() => router.back()}
          style={{ cursor: "pointer", fontSize: "30px", color: "#343745" }}
        >
          «
        </span>
        <span
          style={{
            fontSize: "13px",
            color: "#00ccd8",
            marginTop: "30px",
          }}
        >
          nickname : {nickname}
        </span>
        <h4
          style={{
            fontSize: "29px",
            color: "#343745",
            marginTop: "5px",
          }}
        >
          ▶︎ {title}
        </h4>
        <p
          style={{
            fontSize: "17px",
            color: "#343745",
            marginTop: "25px",
          }}
        >
          {content}
        </p>
      </div>
      <div
        style={{
          textAlign: "left",
          padding: "20px",
          margin: "70px 0 0 60px",
          display: "flex",
          flexDirection: "column",
          width: "320px",
          borderLeft: "1.5px solid lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          {!isEditing ? (
            <>
              <St.Input
                style={{ width: "290px", height: "30px" }}
                name="comments"
                value={comment}
                type="text"
                onChange={handleCommentChange}
                placeholder="코멘트"
              />
              <St.Button
                style={{
                  width: "70px",
                  height: "30px",
                  margin: "7px 0 0 7px",
                }}
                onClick={postComment}
                buttontheme="primary"
              >
                등록
              </St.Button>
            </>
          ) : (
            <>
              <St.Input
                style={{ width: "290px", height: "30px" }}
                name="comments"
                value={commentBody}
                type="text"
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="수정할 내용"
              />
              <St.Button
                style={{
                  width: "70px",
                  height: "30px",
                  margin: "7px 0 0 7px",
                }}
                // updateComment("수정하려는 댓글의 ID") -> 처음에
                onClick={() => updateComment()}
                buttontheme="secondary"
              >
                수정
              </St.Button>
            </>
          )}
        </div>
        {commentsList.map((comment) => (
          <div key={comment.id}>
            <p
              style={{
                fontSize: "13px",
                color: "#343745",
                marginTop: "10px",
              }}
            >
              ▸ {comment.comment}
              {userNickname === comment.nickname && (
                <>
                  <St.Button
                    buttontheme="secondary"
                    onClick={() => deleteComment(comment.id)}
                    style={{
                      width: "50px",
                      height: "20px",
                      margin: "7px 0 0 7px",
                    }}
                  >
                    ✖︎
                  </St.Button>
                  <St.Button
                    buttontheme="secondary"
                    onClick={() =>
                      toggleAndSetCommentId(comment.id, comment.comment)
                    }
                    style={{
                      width: "50px",
                      height: "20px",
                      margin: "7px 0 7px 7px",
                      fontWeight: "bold",
                    }}
                  >
                    ✚
                  </St.Button>
                </>
              )}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "gray",
                marginTop: "-10px",
              }}
            >
              {formatDate(comment.createdAt)}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#00ccd8",
                marginTop: "-10px",
              }}
            >
              nickname : {comment.nickname}
            </p>
          </div>
        ))}
      </div>
    </St.ContentBox>
  );
};

export default ReadContent;
