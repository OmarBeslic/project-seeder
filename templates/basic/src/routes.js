import { getPost, getPosts } from "./api.js";

export const routes = [
  {
    path: "/",
    filename: "Home",
  },
  {
    path: "/about",
    filename: "About",
  },
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
  {
    path: "/dashboard",
    filename: "Dashboard",
    authenticated: true,
  },
  {
    path: "/users",
    filename: "Users",
    authenticated: true,
  },
  {
    path: "*",
    filename: "FourOfour",
  },
];
