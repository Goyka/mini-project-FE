"use client";
import React, { useState, useEffect } from "react";
import axios from "@/api/instance";
import { useParams, useRouter } from "next/navigation";
import { getToken } from "@/util/token";
import * as St from "@/styles/styles";

/**
 * @author : Kwonyeong Kang, Goya Gim
 * @includes : Modal component for the read page.
 */

const EditContent = ({ closeModal }) => {
  const params = useParams();
  const token = getToken();
  const router = useRouter();
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${params.id}`);
        setCreateTitle(res.data.data.title);
        setCreateBody(res.data.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.id]);

  const EditHandler = async (e) => {
    try {
      const res = await axios.put(
        `/api/posts/${params.id}`,
        {
          title: createTitle,
          content: createBody,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        e.stopPropagation();
        closeModal();
        router.push(`/`);
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
            <h4>게시글 수정하기</h4>
          </div>
          <St.Input
            type="text"
            name="title"
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="제목"
          />
          <textarea
            name="body"
            value={createBody}
            onChange={(e) => setCreateBody(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="내용"
          />
        </>
        <St.Button onClick={EditHandler} buttontheme="primary">
          수정하기
        </St.Button>
      </St.Modal>
    </St.ModalWrap>
  );
};

export default EditContent;
