"use client";

import React from "react";
import * as St from "../styles/styles";
import { useRouter } from "next/navigation";

/**
 * @author : Goya Gim
 */

export function Kanban({ id, title }) {
  const router = useRouter();
  return (
    <>
      <St.Box
        onClick={() => {
          router.push(`/detail/${id}`);
        }}
      >
        <h4>{title}</h4>
        <span>nickname</span>
        <br />
        <span>♥︎ / 💬</span>
      </St.Box>
    </>
  );
}
