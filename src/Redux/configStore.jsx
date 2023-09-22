"use client";
import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./detailSlice";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: { posts: postReducer, detail: detailReducer },
});
export default store;
