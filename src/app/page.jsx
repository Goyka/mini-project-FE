"use client";
import React, { useEffect, useState } from "react";
import { Kanban } from "@/components/Kanban";
import Create from "@/components/Create";
import * as St from "../styles/styles";
import Image from "next/image";
import kanbanLogo from "/public/kanbanLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../Redux/postSlice";

/**
 * @author : Goya Gim
 * @includes : Read posts in main page.
 *             Open Modals for the Login & Create sections.
 */

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainPageKey, setMainPageKey] = useState(0);

  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.post);
  console.log(posts);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // getBodyContent();
  };

  useEffect(() => {
    // getBodyContent();
    dispatch(__getPost());
  }, [dispatch]);

  // const getToken = () => {
  //   return sessionStorage.getItem("token");
  // };

  // const getBodyContent = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/test", [
  //       {
  //         id,
  //         title,
  //       },
  //     ]);
  //     setPosts(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);

  //   }
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
            <p>Can? Ban! 💢</p>
          </div>
          <St.RecentPost>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Kanban key={post.id} id={post.id} title={post.title} />
              ))
            ) : (
              <div />
            )}
          </St.RecentPost>
        </St.RePostWrap>

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
