"use client";
import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./detailSlice";
import postReducer from "./postSlice";

/**
 * @author : Goya Gim
 */

const store = configureStore({
  reducer: { post: postReducer, detail: detailReducer },
});
export default store;
