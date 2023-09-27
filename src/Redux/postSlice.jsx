"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/instance";

/**
 * @author : Goya Gim
 * @includes : Get server data from api and send it to the
 *             app/page.jsx
 *             Redux Toolkit & thunk
 */

export const __getPost = createAsyncThunk(
  "posts/getPost",
  async (payload, thunkAPI) => {
    const pageNum = payload.page ? payload.page : 1;
    try {
      const res = await axios.get(`/api/posts?page=${pageNum}&size=12`);

      return res.data.data.content;
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }
);

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  postsPerPage: 12,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, ...action.payload];
        state.currentPage += 1;
      })
      .addCase(__getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
