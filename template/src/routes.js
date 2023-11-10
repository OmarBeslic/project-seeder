import { getPost, getPosts } from "./api.js";

export const routes = [
  {
    path: "/",
    slug: "Home",
  },
  {
    path: "/about",
    slug: "About",
  },
  {
    path: "/posts",
    slug: "Posts",
    // Prefetch data for initial store state
    // { 'store key': 'action to perform to get data' }
    prefetch: [{ posts: getPosts }],
  },
  {
    path: "/post/:id",
    slug: "Post",
    prefetch: [{ post: getPost }],
  },
  {
    path: "/dashboard",
    slug: "Dashboard",
    authenticated: true,
  },
  {
    path: "/users",
    slug: "Users",
    authenticated: true,
  },
  {
    path: "*",
    slug: "FourOfour",
  },
];
