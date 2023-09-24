import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/instance";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await axios.get(`/api/posts/${postId}`);
    console.log(response);
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, comment, token }) => {
    const response = await axios.post(
      `/api/posts/${postId}/comments`,
      { comment },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.comment;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId, token }) => {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return commentId;
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ postId, commentId, commentBody, token }) => {
    const response = await axios.put(
      `/api/posts/${postId}/comments/${commentId}`,
      { comment: commentBody },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      }
    );
    return response.data.comment;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedCommentIndex = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (updatedCommentIndex !== -1) {
          state.comments[updatedCommentIndex] = action.payload;
        }
      });
  },
});

export default commentsSlice.reducer;
