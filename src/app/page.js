"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Kanban } from "@/components/Kanban";
import * as St from "./styles";
import Image from "next/image";
import kanbanLogo from "/public/kanbanLogo.png";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getBodyContent();
  }, []);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const getBodyContent = async () => {
    try {
      const response = await axios.get("http://localhost:4000/test", [
        {
          id,
          // username,
          title,
          // createdAt,
          // modifiedAt,
        },
      ]);
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // alert(error.response.data.message);
    }
  };

  return (
    <St.Container>
      <St.Header>
        <St.Nav>
          <Image src={kanbanLogo} alt="Title Logo" width={160} height={40} />
          <St.BtnWrap>
            <St.Button>
              <St.StyledLink href="/create">글쓰기</St.StyledLink>
            </St.Button>
            <St.Button>
              <St.StyledLink href="/login">로그인</St.StyledLink>
            </St.Button>
          </St.BtnWrap>
        </St.Nav>
        <St.BannerWrap></St.BannerWrap>
      </St.Header>
      <St.BodyWrap>
        <St.TrPostWrap>
          <div>
            <p>Trending 🔥</p>
          </div>
        </St.TrPostWrap>
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
    </St.Container>
  );
}
