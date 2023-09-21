"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPostDetail } from "@/Redux/detailSlice";
import Loading from "@/components/Loading";
import ReadContent from "@/components/ReadContent";
import EditContent from "@/components/EditContent";
import * as St from "../styles/styles";

import Image from "next/image";
import kanbanLogo from "/public/kanbanLogo.png";

/**
 * @author : Goya Gim
 */

export default async function Read({
  openCreateModal,
  openLoginModal,
  closeCreateModal,
  closeLoginModal,
  logoutHandler,
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTokenIn, setIsTokenIn] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [mainPageKey, setMainPageKey] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(__getPostDetail());
  }, [dispatch]);

  const openEditModal = () => {
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  return (
    <St.Container>
      <St.Header>
        <St.Nav>
          <Image src={kanbanLogo} alt="Title Logo" width={160} height={40} />
          <St.BtnWrap>
            <St.Button onClick={openCreateModal} buttontheme="primary">
              글쓰기
            </St.Button>
            {isTokenIn ? (
              <St.Button onClick={logoutHandler} buttontheme="secondary">
                로그아웃
              </St.Button>
            ) : (
              <St.Button onClick={openLoginModal} buttontheme="primary">
                로그인
              </St.Button>
            )}
          </St.BtnWrap>
        </St.Nav>
      </St.Header>
      <St.BodyWrap>
        <St.RePostWrap>
          <div>
            <h3>페이지 제목</h3>
          </div>
          <St.RecentPost>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              Object.values(posts).map((post) => (
                <>
                  <ReadContent
                    key={post.id}
                    id={post.id}
                    nickname={post.nickname}
                    title={post.title}
                    content={post.content}
                  />
                  <St.Button onClick={openEditModal} buttontheme="secondary">
                    수정
                  </St.Button>
                </>
              ))
            )}
          </St.RecentPost>
        </St.RePostWrap>
        <St.Footer>© Copyright Team 6. All rights reserved</St.Footer>
      </St.BodyWrap>
      {isEditOpen && (
        <St.ModalWrap onClick={isEditOpen ? closeEditModal : undefined}>
          <St.Modal>
            <EditContent
              closeModal={closeEditModal}
              setMainPageKey={setMainPageKey}
            />
          </St.Modal>
        </St.ModalWrap>
      )}
      {isCreateOpen && (
        <St.ModalWrap onClick={isCreateOpen ? closeCreateModal : undefined}>
          <St.Modal>
            <Create
              closeModal={closeCreateModal}
              setMainPageKey={setMainPageKey}
            />
          </St.Modal>
        </St.ModalWrap>
      )}
      {isLoginOpen && (
        <St.ModalWrap onClick={isLoginOpen ? closeLoginModal : undefined}>
          <St.Modal>
            <Login
              closeModal={closeLoginModal}
              setMainPageKey={setMainPageKey}
            />
          </St.Modal>
        </St.ModalWrap>
      )}
    </St.Container>
  );
}
