"use client";
// React & Redux
import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../Redux/postSlice";
// Styles
import * as Pg from "@/styles/pagestyles";
import * as St from "../styles/styles";
import shadeLogo from "../img/shadeLogo.webp";
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
  const pageEnd = useRef();
  // React lazy - Suspense로 최적화
  const LazyCreate = lazy(() => import("@/components/Create"));
  const LazyLogin = lazy(() => import("@/components/Login"));
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTokenIn, setIsTokenIn] = useState(false);
  // For infinity Scroll
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [moreData, setMoreData] = useState(true);
  const [cachedData, setCachedData] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);

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
  }, [currentPage]);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    if (isLoadingMore) {
      //로딩되었을 때만 실행
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0.8 }
      );
      //옵져버 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [isLoadingMore]);

  // 그냥 __getPost로 dispatch 받는게 아닌, 캐시 기능을 이용한 최적화
  const fetchData = async (page) => {
    try {
      const response = await dispatch(
        __getPost({ page, perPage: postsPerPage })
      );
      const newData = response.payload;

      setCachedData((prevData) => [...prevData, ...newData]);
      setIsLoadingMore(true);

      if (page === 1) {
        const trending = newData
          .slice()
          .sort((a, b) => b.commentsList.length - a.commentsList.length)
          .slice(0, 4);
        setTrendingPosts(trending);
        setIsLoadingMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoadingMore(false);
    }
  };
  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

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

  return (
    <Pg.Container>
      <Pg.Header>
        <Pg.Nav>
          <Image
            src={shadeLogo}
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
            {trendingPosts.length === 0 ? (
              <Loading />
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
        <div ref={pageEnd} />
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
        <St.ModalWrap>
          <St.Modal>
            <Suspense fallback={<Loading />}>
              <LazyLogin closeModal={closeLoginModal} />
            </Suspense>
          </St.Modal>
        </St.ModalWrap>
      )}
    </Pg.Container>
  );
}
