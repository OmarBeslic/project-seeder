import { getPost, getPosts } from "./api.js";

export const prefetchRoutes = [
  {
    path: "/posts",
    filename: "Posts",
    // Prefetch data for initial store state
    // { 'store key': 'action to perform to get data' }
    prefetch: [{ posts: getPosts }],
  },
  {
    path: "/post/:id",
    filename: "Post",
    prefetch: [{ post: getPost }],
  },
];
