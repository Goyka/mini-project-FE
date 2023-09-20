"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../Redux/postSlice";
import { useInView } from "react-intersection-observer";

import { Kanban } from "@/components/Kanban";
import Create from "@/components/Create";
import Loading from "@/components/Loading";

import * as St from "../styles/styles";
import Image from "next/image";
import kanbanLogo from "/public/kanbanLogo.png";

/**
 * @author : Goya Gim
 * @includes : Read posts in main page.
 *             Open Modals for the Login & Create sections.
 */

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainPageKey, setMainPageKey] = useState(0);
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.post);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  useEffect(() => {
    if (inView) {
      dispatch(__getPost());
      console.log(inView);
    }
  }, [inView]);

  // const getToken = () => {
  //   return sessionStorage.getItem("token");
  // };

  return (
    <St.Container>
      <St.Header>
        <St.Nav>
          <Image src={kanbanLogo} alt="Title Logo" width={160} height={40} />
          <St.BtnWrap>
            <St.Button onClick={openModal}>글쓰기</St.Button>
            <St.Button>
              <St.StyledLink href="/login">로그인</St.StyledLink>
            </St.Button>
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
              Object.values(posts).map((post) => (
                <Kanban key={post.id} id={post.id} title={post.title} />
              ))
            )}
          </St.RecentPost>
        </St.RePostWrap>
        <div ref={ref} />
        <St.Footer>© Copyright Team 6. All rights reserved</St.Footer>
      </St.BodyWrap>
      {isModalOpen && (
        <St.ModalWrap onClick={isModalOpen ? closeModal : undefined}>
          <St.Modal>
            <Create closeModal={closeModal} setMainPageKey={setMainPageKey} />
          </St.Modal>
        </St.ModalWrap>
      )}
    </St.Container>
  );
}
