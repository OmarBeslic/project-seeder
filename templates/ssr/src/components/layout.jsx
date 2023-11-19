import { Outlet } from "react-router-dom";
import useStore from "../store";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  const { style, user } = useStore();

  return (
    <div id="app-wrapper">
      <Header />
      <div id="content-wrapper" className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
