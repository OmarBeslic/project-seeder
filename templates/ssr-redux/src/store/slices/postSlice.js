import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../services/postService";

const initialState = {
  posts: [],
  singlePost: null,
  loading: false,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "all/posts",
  async (id, { dispatch }) => {
    const res = await postService.getAllPosts();
    return res.data;
  }
);

export const blogSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        return {
          ...state,
          posts: action.payload,
          loading: false,
        };
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      });
  },
});

export const { cleanUpBlogs } = blogSlice.actions;

export default blogSlice.reducer;
