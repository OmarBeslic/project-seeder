import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import useStore from "../store";

export default function About() {
  const { style } = useStore();

  return (
    <>
      <div
        style={{
          fontWeight: 20,
          fontSize: 36,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        About
      </div>
      <div
        style={{
          textAlign: "justify",
          fontSize: 18,
          maxWidth: 800,
          margin: "auto",
          lineHeight: 1.8,
        }}
      >
        Project Seeder is a comprehensive development tool designed to deliver a
        fully-featured web application right from the start. It aims to
        streamline the development process by integrating essential components
        that often require additional setup and configuration.
        <br />
        <br /> Your application includes{" "}
        <span style={{ fontWeight: 600 }}> server-side rendering (SSR)</span> to
        enhance performance and boost search engine optimization without any
        additional setup. The integrated{" "}
        <span style={{ fontWeight: 600 }}> state management system</span>{" "}
        ensures seamless data flow within your app, allowing you to focus on
        building features rather than dealing with complex state configurations.
        <br />
        <br />
        Enjoy the convenience of a simple{" "}
        <span style={{ fontWeight: 600 }}> routing system</span> and a built-in
        <span style={{ fontWeight: 600 }}> API wrapper</span> which facilitates
        easy connection to various backend services, streamlining data fetching
        and integration.
        <br />
        <br />
        Additionally, we've included a{" "}
        <span style={{ fontWeight: 600 }}> UI library</span> and a predefined
        layout, saving you time on styling and providing a collection of
        pre-designed components that adhere to modern design principles.
        <br />
        <br />
        With Project Seeder, developers can kickstart their projects with a
        solid foundation, eliminating the need for manual integration of crucial
        tools and libraries.
      </div>
      <Button
        variant="contained"
        style={{ background: style?.layerOneBackgroundColor, marginTop: 30 }}
      >
        <NavLink className="link" to={"/get-started"}>
          Let's get started
        </NavLink>
      </Button>
    </>
  );
}
