"use client";
import { configureStore } from "@reduxjs/toolkit";
import post from "./postSlice";

const store = configureStore({
  reducer: { post: post },
});
export default store;
