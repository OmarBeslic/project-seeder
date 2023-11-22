import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import Posts from "./pages/Posts.jsx";
import Post from "./pages/Post.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import FourOfour from "./pages/FourOfour.jsx";

export const routes = [
  {
    path: "/",
    slug: "home",
    component: Home,
  },
  {
    path: "/about",
    slug: "about",
    component: About,
  },
  {
    path: "/get-started",
    slug: "getStarted",
    component: GetStarted,
  },
  {
    path: "/posts",
    slug: "posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    slug: "post",
    component: Post,
  },
  {
    path: "/dashboard",
    slug: "dashboard",
    authentication: true,
    component: Dashboard,
  },
  {
    path: "/profile",
    slug: "profile",
    authentication: true,
    component: Profile,
  },
  {
    path: "*",
    slug: "fourOfour",
    component: FourOfour,
  },
];
