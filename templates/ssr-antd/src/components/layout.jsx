import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import useStore from "../store";

import AppFooter from "./footer";
import AppHeader from "./header";

const { Header, Footer, Content } = Layout;

export default function AppLayout() {
  const { style, user } = useStore();

  return (
    <div id="app-wrapper">
      <Header>
        <AppHeader />
      </Header>
      <Content className="content-wrapper">
        <Outlet />
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </div>
  );
}
