"use client";

import React from "react";
import * as St from "../app/styles";
import { useRouter } from "next/navigation";

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
