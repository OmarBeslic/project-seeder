import useStore from "../store";
import { login, logout } from "../api.js";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const pages = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Posts", link: "/posts" },
];

const pagesAuthenticated = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Profile", link: "/profile" },
];

export default function Header() {
  const { user, updateUser } = useStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = async () => {
    console.log("user");
    const user = await login();
    console.log(user);
    updateUser(user);
    setModalOpen(false);
  };

  const handleLogout = () => {
    updateUser(null);
    logout();
  };

  return (
    <>
      <div className="header">
        <div className="menu-logged-out">
          {pages.map((page) => (
            <NavLink
              key={page.title}
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : "link"
              }
              to={page.link}
            >
              {page.title}
            </NavLink>
          ))}
        </div>
        {user && (
          <div className="menu-logged-in">
            {pagesAuthenticated.map((page) => (
              <NavLink
                key={page.title}
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
                to={page.link}
              >
                {page.title}
              </NavLink>
            ))}
          </div>
        )}
        <div className="menu-user-action">
          <NavLink
            key="login"
            onClick={() => {
              user ? handleLogout() : setModalOpen(true);
            }}
            className="link"
          >
            {user ? "Logout" : "Login"}
          </NavLink>
        </div>
      </div>
      <div
        className="modal-login-wrapper"
        style={{ display: modalOpen ? "block" : "none" }}
      >
        <div className="modal-login-box">
          <img
            src="/assets/img/close.svg"
            className="modal-login-close"
            onClick={() => setModalOpen(false)}
          />
          <p>Login</p>
          <div className="modal-login-form">
            <input id="username" placeholder="Enter username"></input>
            <input id="password" placeholder="Enter password"></input>
            <button
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
