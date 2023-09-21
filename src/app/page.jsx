"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../Redux/postSlice";
import { clearToken } from "@/util/clearToken";
import { getToken } from "@/util/token";
import { useInView } from "react-intersection-observer";

import { Kanban } from "@/components/Kanban";
import Create from "@/components/Create";
import Loading from "@/components/Loading";
import Login from "@/components/Login";

import * as St from "../styles/styles";
import Image from "next/image";
import kanbanLogo from "/public/kanbanLogo.png";
import { useRouter } from "next/navigation";

/**
 * @author : Goya Gim
 * @includes : Read posts in main page.
 *             Open Modals for the Login & Create sections.
 */

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTokenIn, setIsTokenIn] = useState(false);
  const [mainPageKey, setMainPageKey] = useState(0);
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, posts } = useSelector((state) => state.post);

  const openCreateModal = () => {
    setIsCreateOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };
  const openLoginModal = () => {
    setIsLoginOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const logoutHandler = async () => {
    await clearToken();
    setIsTokenIn(!isTokenIn);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsTokenIn(false);
    } else {
      setIsTokenIn(!isTokenIn);
    }
  }, []);

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  useEffect(() => {
    if (inView) {
      dispatch(__getPost());
      console.log("인피니트 스크롤 ->", inView);
    }
  }, [inView]);

  // const getToken = () => {
  //   return sessionStorage.getItem("token");
  // };

  return (
    <St.Container>
      <St.Header>
        <St.Nav>
          <Image
            src={kanbanLogo}
            alt="Title Logo"
            width={160}
            height={40}
            priority
          />
          <St.BtnWrap>
            {!isTokenIn ? (
              <p />
            ) : (
              <St.Button onClick={openCreateModal} buttontheme="primary">
                글쓰기
              </St.Button>
            )}

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
        <St.BannerWrap></St.BannerWrap>
      </St.Header>
      <St.BodyWrap>
        <St.RePostWrap>
          <div>
            <h3>뉴스피드</h3>
          </div>
          <St.RecentPost>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              Object.values(posts).map((data) => (
                <Kanban
                  key={data.id}
                  id={data.id}
                  nickname={data.nickname}
                  title={data.title}
                />
              ))
            )}
          </St.RecentPost>
        </St.RePostWrap>
        <div ref={ref} />
        <St.Footer>© Copyright Team 6. All rights reserved</St.Footer>
      </St.BodyWrap>
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
