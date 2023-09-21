"use client";
import { configureStore } from "@reduxjs/toolkit";
import post from "./postSlice";

/**
 * @author : Goya Gim
 */

const store = configureStore({
  reducer: { post: post },
});
export default store;
