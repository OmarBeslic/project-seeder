import { getPost, getPosts } from "./api.js";

export const prefetchRoutes = [
  {
    path: "/posts",
    // Prefetch data for initial store state
    // { 'store key': 'action to perform to get data' }
    prefetch: [{ posts: getPosts }],
  },
  {
    path: "/posts/:id",
    prefetch: [{ post: getPost }],
  },
];
