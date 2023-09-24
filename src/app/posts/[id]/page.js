"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPostDetail } from "@/Redux/detailSlice";
import { useParams, useRouter } from "next/navigation";
import axios from "@/api/instance";

import Loading from "@/components/Loading";
import ReadContent from "@/components/ReadContent";
import EditContent from "@/components/EditContent";
import Create from "@/components/Create";

import * as St from "@/styles/styles";
import * as Pg from "@/styles/pagestyles";
import Image from "next/image";
import kanlogo from "/public/kanlogo.webp";

import isUserFit from "@/util/isUserFit";
import { getToken } from "@/util/token";

/**
 * @author : Kwonyeong Kang, Goya Gim
 * @include : page route for content read. contain ReadContent.jsx / EditContent.jsx
 */

export default function Read() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.detail);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTokenIn, setIsTokenIn] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const token = getToken();

  useEffect(() => {
    router.prefetch(`/posts/${params.id}`);
  }, [router]);

  useEffect(() => {
    dispatch(__getPostDetail(params.id));
    const userNicknameData = isUserFit();
    setUserNickname(userNicknameData);
  }, []);

  const openCreateModal = () => {
    setIsCreateOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };
  const openEditModal = () => {
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setIsTokenIn(!isTokenIn);
    router.push("/");
  };

  const deletePost = async (e) => {
    try {
      const res = await axios.delete(`/api/posts/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        e.stopPropagation();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pg.Container>
      <Pg.Header>
        <Pg.Nav>
          <Image
            src={kanlogo}
            priority
            alt="Title Logo"
            width={230}
            height={70}
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          />
          <Pg.BtnWrap>
            <St.Button onClick={openCreateModal} buttontheme="primary">
              글쓰기
            </St.Button>
            <St.Button onClick={logoutHandler} buttontheme="secondary">
              로그아웃
            </St.Button>
          </Pg.BtnWrap>
        </Pg.Nav>
      </Pg.Header>
      <Pg.BodyWrap>
        <Pg.RePostWrap>
          <Pg.RecentPost>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              <St.ContentWrap>
                <ReadContent
                  key={posts.id}
                  id={posts.id}
                  nickname={posts.nickname}
                  title={posts.title}
                  content={posts.content}
                  commentsList={posts.commentsList}
                  userNickname={userNickname}
                />
                <div>
                  {userNickname === posts.nickname ? (
                    <>
                      <St.Button onClick={openEditModal} buttontheme="primary">
                        수정
                      </St.Button>
                      <St.Button onClick={deletePost} buttontheme="secondary">
                        삭제
                      </St.Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </St.ContentWrap>
            )}
          </Pg.RecentPost>
        </Pg.RePostWrap>
        <Pg.Footer>© Copyright Team 6. All rights reserved</Pg.Footer>
      </Pg.BodyWrap>
      {isEditOpen && (
        <St.ModalWrap onClick={isEditOpen ? closeEditModal : undefined}>
          <St.Modal>
            <EditContent closeModal={closeEditModal} />
          </St.Modal>
        </St.ModalWrap>
      )}
      {isCreateOpen && (
        <St.ModalWrap onClick={isCreateOpen ? closeCreateModal : undefined}>
          <St.Modal>
            <Create closeModal={closeCreateModal} />
          </St.Modal>
        </St.ModalWrap>
      )}
    </Pg.Container>
  );
}
