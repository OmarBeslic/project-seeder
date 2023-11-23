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
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    component: Post,
  },
  {
    path: "/dashboard",
    authenticated: true,
    component: Dashboard,
  },
  {
    path: "/users",
    authenticated: true,
    component: Users,
  },
  {
    path: "*",
    component: FourOfour,
  },
];
