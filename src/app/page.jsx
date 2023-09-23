"use client";
// React & Redux
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { __getPost } from "../Redux/postSlice";
// Styles
import * as Pg from "@/styles/pagestyles";
import * as St from "../styles/styles";
import kanlogo from "/public/kanlogo.png";
// Components
import { getToken } from "@/util/token";
import { Kanban } from "@/components/Kanban";
import Create from "@/components/Create";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
// Next.js
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * @author : Goya Gim
 * @includes : Read posts in main page.
 *             Open Modals for the Login & Create sections.
 */

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, error, posts } = useSelector((state) => state.posts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTokenIn, setIsTokenIn] = useState(false);
  const [mainPageKey, setMainPageKey] = useState(0);
  // For infinity Scroll
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [moreData, setMoreData] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsTokenIn(false);
    } else {
      setIsTokenIn(true);
    }
  }, []);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    dispatch(__getPost({ page: currentPage, perPage: postsPerPage }));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    console.log("인피니트 스크롤 작동 >>>");
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [currentPage, isLoadingMore]);

  useEffect(() => {
    console.log("리렌더링 탐지 >>>", mainPageKey);
  }, [mainPageKey]);

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

  const logoutHandler = () => {
    const removeToken = () => {
      localStorage.removeItem("Authorization");
    };
    removeToken();
    setIsTokenIn(!isTokenIn);
  };

  const scrollHandler = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
      !isLoadingMore &&
      moreData
    ) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      dispatch(__getPost({ page: nextPage, perPage: postsPerPage })).then(
        () => {
          setCurrentPage(nextPage);
          setIsLoadingMore(false);
          if (!isLoading) {
            setMoreData(false);
          }
        }
      );
    }
  };

  const trendingPosts = [...Object.values(posts)]
    .sort((a, b) => {
      return b.commentsList.length - a.commentsList.length;
    })
    .slice(0, 4);

  return (
    <Pg.Container>
      <Pg.Header>
        <Pg.Nav>
          <Image
            src={kanlogo}
            priority
            alt="logo"
            onClick={() => {
              router.push("/");
            }}
            width={230}
            height={70}
            style={{
              cursor: "pointer",
            }}
          />

          <Pg.BtnWrap>
            {!isTokenIn ? (
              <St.Button
                onClick={openLoginModal}
                style={{ marginTop: "10px" }}
                buttontheme="primary"
              >
                로그인
              </St.Button>
            ) : (
              <>
                <St.Button
                  onClick={openCreateModal}
                  style={{ marginTop: "10px" }}
                  buttontheme="primary"
                >
                  글쓰기
                </St.Button>
                <St.Button
                  onClick={logoutHandler}
                  style={{ marginTop: "10px" }}
                  buttontheme="secondary"
                >
                  로그아웃
                </St.Button>
              </>
            )}
          </Pg.BtnWrap>
        </Pg.Nav>
        <Pg.BannerWrap></Pg.BannerWrap>
      </Pg.Header>
      <Pg.BodyWrap>
        <Pg.RePostWrap>
          <div
            style={{
              fontSize: "20px",
            }}
          >
            <h3> 💫 Trending</h3>
          </div>
          <Pg.RecentPost>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              trendingPosts.map((data) => (
                <Kanban
                  isTokenIn={isTokenIn}
                  key={data.id}
                  id={data.id}
                  nickname={data.nickname}
                  title={data.title}
                  commentLength={data.commentsList.length}
                />
              ))
            )}
          </Pg.RecentPost>
        </Pg.RePostWrap>
        <Pg.RePostWrap>
          <div
            style={{
              fontSize: "20px",
            }}
          >
            <h3> ☕︎ Newsfeed</h3>
          </div>
          <Pg.RecentPost>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              [...Object.values(posts)]
                .slice(0, currentPage * postsPerPage)
                .map((data) => (
                  <Kanban
                    isTokenIn={isTokenIn}
                    key={data.id}
                    id={data.id}
                    nickname={data.nickname}
                    title={data.title}
                    commentLength={data.commentsList.length}
                  />
                ))
            )}
          </Pg.RecentPost>
          {isLoadingMore && <Loading />}
        </Pg.RePostWrap>

        <Pg.Footer>© Copyright Team 6. All rights reserved</Pg.Footer>
        <div ref={ref} />
      </Pg.BodyWrap>
      {isCreateOpen && (
        <St.ModalWrap onClick={isCreateOpen ? closeCreateModal : undefined}>
          <St.Modal>
            <Create closeModal={closeCreateModal} />
          </St.Modal>
        </St.ModalWrap>
      )}
      {isLoginOpen && (
        <St.ModalWrap onClick={isLoginOpen ? closeLoginModal : undefined}>
          <St.Modal>
            <Login
              closeModal={closeLoginModal}
              setmainpagekey={setMainPageKey}
            />
          </St.Modal>
        </St.ModalWrap>
      )}
    </Pg.Container>
  );
}
