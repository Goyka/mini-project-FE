"use client";
// React & Redux
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { __getPost } from "../Redux/postSlice";
// Styles
import * as Pg from "@/styles/pagestyles";
import * as St from "../styles/styles";
import kanlogo from "/public/kanlogo.webp";
// Components
import { getToken } from "@/util/token";
import { Kanban } from "@/components/Kanban";
import Loading from "@/components/Loading";
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
  // React lazy - Suspense로 최적화
  const LazyCreate = lazy(() => import("@/components/Create"));
  const LazyLogin = lazy(() => import("@/components/Login"));
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTokenIn, setIsTokenIn] = useState(false);
  // For infinity Scroll
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [moreData, setMoreData] = useState(true);
  const [cachedData, setCachedData] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsTokenIn(false);
    } else {
      setIsTokenIn(true);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  // 그냥 __getPost로 dispatch 받는게 아닌, 캐시 기능을 이용한 최적화
  const fetchData = async (page) => {
    try {
      setIsLoadingMore(true);
      const response = await dispatch(
        __getPost({ page, perPage: postsPerPage })
      );
      const newData = response.payload;

      setCachedData((prevData) => [
        ...prevData.slice(0, (page - 1) * postsPerPage),
        ...newData,
      ]);
      setCurrentPage(page);
      setIsLoadingMore(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const scrollHandler = () => {
      const currentScrollY = window.scrollY;
      if (
        currentScrollY + window.innerHeight >=
          document.body.offsetHeight - 200 &&
        currentScrollY > prevScrollY &&
        !isLoadingMore &&
        moreData
      ) {
        const nextPage = currentPage + 1;
        if (nextPage * postsPerPage <= cachedData.length) {
          setCurrentPage(nextPage);
        } else {
          fetchData(nextPage);
        }
      }
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [currentPage, isLoadingMore, cachedData, moreData, prevScrollY]);

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
              trendingPosts.map((data, index) => (
                <Kanban
                  isTokenIn={isTokenIn}
                  key={`${data.id}-${index}`}
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
                .map((data, index) => (
                  <Kanban
                    isTokenIn={isTokenIn}
                    key={`${data.id}-${index}`}
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
            <Suspense fallback={<Loading />}>
              <LazyCreate closeModal={closeCreateModal} />
            </Suspense>
          </St.Modal>
        </St.ModalWrap>
      )}
      {isLoginOpen && (
        <St.ModalWrap onClick={isLoginOpen ? closeLoginModal : undefined}>
          <St.Modal>
            <Suspense fallback={<Loading />}>
              <LazyLogin closeModal={closeCreateModal} />
            </Suspense>
          </St.Modal>
        </St.ModalWrap>
      )}
    </Pg.Container>
  );
}
