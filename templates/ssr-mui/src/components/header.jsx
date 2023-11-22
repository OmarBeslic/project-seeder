import { useState } from "react";
import useStore from "../store";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { Modal, TextField } from "@mui/material";
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

const MenuLoggedIn = ({
  handleOpenUserMenu,
  handleCloseUserMenu,
  loggedInMenu,
  anchorElUser,
}) => {
  const { updateUser } = useStore();

  const handleLogout = () => {
    updateUser(null);
    logout();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open user menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {loggedInMenu?.map((item) => (
          <MenuItem key={`item${item.title}`} onClick={handleCloseUserMenu}>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "link pending" : isActive ? "link active" : "link"
              }
              to={item.link}
            >
              {item.title}
            </NavLink>
          </MenuItem>
        ))}
        <MenuItem key={"itemlogout"} onClick={handleCloseUserMenu}>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "link pending" : isActive ? "link active" : "link"
            }
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </Box>
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
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Login">
        <Button
          onClick={handleModalOpen}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Login
        </Button>
      </Tooltip>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "var(--layerTwoBackgroundColor)",
            color: "var(--layerTwoTextColor)",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Login user
          </Typography>
          <TextField
            required
            label="Username"
            placeholder="Enter username"
            className="login-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            required
            type="password"
            label="Password"
            placeholder="Enter password"
            className="login-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            onClick={handleLogin}
            sx={{ color: "white", display: "block", marginTop: "20px" }}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default function Header() {
  const { style, user } = useStore();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <AppBar position="static" className="header-wrapper">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PLACEHOLDER_PROJECT_FOLDER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={`page${page.title}`}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      to={page.link}
                    >
                      {page.title}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PLACEHOLDER_PROJECT_FOLDER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={`button${page.title}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "link pending"
                      : isActive
                      ? "link active"
                      : "link"
                  }
                  to={page.link}
                >
                  {page.title}
                </NavLink>
              </Button>
            ))}
          </Box>

          {isLoggedIn() ? (
            <MenuLoggedIn
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              anchorElUser={anchorElUser}
              loggedInMenu={loggedInMenu}
            />
          ) : (
            <MenuLoggedOut />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
