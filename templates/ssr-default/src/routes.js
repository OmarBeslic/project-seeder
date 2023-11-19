import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Posts from "./pages/Posts.jsx";
import Post from "./pages/Post.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
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
    authenticated: true,
    component: Dashboard,
  },
  {
    path: "/users",
    slug: "users",
    authenticated: true,
    component: Users,
  },
  {
    path: "*",
    slug: "fourOfour",
    component: FourOfour,
  },
];
