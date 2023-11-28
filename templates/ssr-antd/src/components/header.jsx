import { useState } from "react";
import useStore from "../store";

import { Avatar, Button, Popover, Modal, Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import { login, logout } from "../api";

const pages = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Posts", link: "/posts" },
];

const loggedInMenu = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "My profile", link: "/profile" },
];

const NavMenu = ({ pages }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const popoverContent = (
    <div className="popover-content-menu-logged-in">
      {pages?.map((item) => (
        <div key={`item${item.title}`} onClick={handleCloseUserMenu}>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={item.link}
          >
            {item.title}
          </NavLink>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: 10, flexGrow: 0 }}>
      <Popover
        className="header-login-menu"
        content={popoverContent}
        placement="rightBottom"
        trigger="click"
        open={openUserMenu}
        onOpenChange={(newOpen) => setOpenUserMenu(newOpen)}
      >
        <MenuOutlined />
      </Popover>
    </div>
  );
};

const MenuLoggedIn = ({ loggedInMenu }) => {
  const { updateUser } = useStore();

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    updateUser(null);
    logout();
  };

  const popoverContent = (
    <div className="popover-content-menu-logged-in">
      {loggedInMenu?.map((item) => (
        <div key={`item${item.title}`} onClick={handleCloseUserMenu}>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={item.link}
          >
            {item.title}
          </NavLink>
        </div>
      ))}
      <div key={"itemlogout"} onClick={handleCloseUserMenu}>
        <NavLink
          to={"/logout"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
  return (
    <div style={{ padding: 10, flexGrow: 0 }}>
      <Popover
        className="header-login-menu"
        content={popoverContent}
        placement="leftBottom"
        trigger="click"
        open={openUserMenu}
        onOpenChange={(newOpen) => setOpenUserMenu(newOpen)}
      >
        <Avatar style={{ cursor: "pointer" }}>U</Avatar>
      </Popover>
    </div>
  );
};

const MenuLoggedOut = () => {
  const { updateUser } = useStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loggedIn = await login({ identifier: username, password });

    // Handle reponse
    if (loggedIn) {
      updateUser(loggedIn);
      handleModalClose();
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div style={{ flexGrow: 0 }}>
      <Button
        type="text"
        onClick={handleModalOpen}
        style={{ my: 2, color: "white", display: "block" }}
      >
        Login
      </Button>
      <Modal
        open={modalOpen}
        onCancel={handleModalClose}
        centered
        footer={false}
        className="login-modal"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "var(--layerTwoBackgroundColor)",
            color: "var(--layerTwoTextColor)",
            boxShadow: "#0000001c 1px 1px 10px",
            padding: "24px",
          }}
        >
          <h2 id="modal-modal-title" style={{ textAlign: "center" }}>
            Login user
          </h2>
          <Input
            required
            label="Username"
            placeholder="Enter username"
            className="login-input"
            value={username}
            size="large"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            required
            type="password"
            label="Password"
            placeholder="Enter password"
            className="login-input"
            value={password}
            size="large"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="text"
            onClick={handleLogin}
            style={{ color: "white", display: "block", marginTop: "20px" }}
          >
            Login
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default function AppHeader() {
  const { style, user } = useStore();

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <div className="header-wrapper">
      <div className="header-toolbar">
        <h2
          className="header-logo-title"
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          PLACEHOLDER_PROJECT_FOLDER
        </h2>

        <div
          className="header-main-menu-mobile"
          style={{ flexGrow: 1, display: "none" }}
        >
          <NavMenu pages={pages} />
        </div>
        <h2
          className="header-logo-title-mobile"
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          PLACEHOLDER_PROJECT_FOLDER
        </h2>
        <div
          className="header-main-menu"
          style={{ flexGrow: 1, display: "flex" }}
        >
          {pages.map((page) => (
            <Button
              type="text"
              key={`button${page.title}`}
              style={{ my: 2, color: "white", display: "block" }}
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
                to={page.link}
              >
                {page.title}
              </NavLink>
            </Button>
          ))}
        </div>

        {isLoggedIn() ? (
          <MenuLoggedIn loggedInMenu={loggedInMenu} />
        ) : (
          <MenuLoggedOut />
        )}
      </div>
    </div>
  );
}
