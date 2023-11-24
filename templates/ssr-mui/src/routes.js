import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import Posts from "./pages/Posts.jsx";
import Post from "./pages/Post.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import FourOfour from "./pages/FourOfour.jsx";
import { getPost, getPosts } from "./api.js";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/get-started",
    component: GetStarted,
  },
  {
    path: "/posts",
    component: Posts,
    // Prefetch data for initial store state
    // [prefetch: { 'store key': 'action to perform to get data' }]
    prefetch: [{ posts: getPosts }],
  },
  {
    path: "/posts/:id",
    component: Post,
    prefetch: [{ post: getPost }],
  },
  {
    path: "/dashboard",
    authentication: true,
    component: Dashboard,
  },
  {
    path: "/profile",
    authentication: true,
    component: Profile,
  },
  {
    path: "*",
    component: FourOfour,
  },
];
