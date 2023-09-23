"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/instance";

/**
 * @author : Goya Gim
 * @includes : Create Slice for getting read page content.
 */

export const __getPostDetail = createAsyncThunk(
  "posts/detailPost",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`api/posts/${payload}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  posts: {
    id: 0,
    nickname: "",
    title: "",
    content: "",
    createdAt: "",
    modifiedAt: "",
    likeCount: 0,
    commentsList: [
      {
        id: 0,
        nickname: "",
        comment: "",
        createdAt: "",
        modifiedAt: "",
      },
    ],
  },
  isLoading: false,
  error: null,
};
const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getPostDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = { ...state.posts, ...action.payload };
      })
      .addCase(__getPostDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = detailSlice.actions;
export default detailSlice.reducer;
