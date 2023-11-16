import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Posts from "./pages/Posts.jsx";
import Post from "./pages/Post.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import FourOfour from "./pages/FourOfour.jsx";

const routes = [
  {
    path: "/",
    filename: "Home",
    component: <Home />,
  },
  {
    path: "/about",
    filename: "About",
    component: <About />,
  },
  {
    path: "/posts",
    filename: "Posts",
    component: <Posts />,
  },
  {
    path: "/post/:id",
    filename: "Post",
    component: <Post />,
  },
  {
    path: "/dashboard",
    filename: "Dashboard",
    authenticated: true,
    component: <Dashboard />,
  },
  {
    path: "/users",
    filename: "Users",
    authenticated: true,
    component: <Users />,
  },
  {
    path: "*",
    filename: "FourOfour",
    component: <FourOfour />,
  },
];

function App() {
  return (
    <>
      <Routes>
        {/* Use Layout as a wrapper for whole app (every route) */}
        <Route element={<Layout />}>
          {/* Render routes */}
          {routes.map((route) => (
            <Route
              key={route.filename}
              path={route.path}
              element={route.component}
            ></Route>
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
