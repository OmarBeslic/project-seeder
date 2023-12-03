import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import useStore from "../store";

import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  const { style, user } = useStore();

  return (
    <div id="app-wrapper">
      <Header />
      <Container className="content-container">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
