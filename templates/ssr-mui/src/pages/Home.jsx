import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import useStore from "../store";

export default function Home() {
  const { style } = useStore();

  return (
    <>
      <img className="home-logo" src={style?.logo} />
      <div style={{ fontWeight: 200, fontSize: 36 }}>
        Welcome to your new project!
      </div>
      <div style={{ fontWeight: 400, fontSize: 36 }}>
        PLACEHOLDER_PROJECT_FOLDER
      </div>
      <div style={{ marginTop: 40 }}>
        <Button
          variant="contained"
          style={{
            background: style?.layerOneBackgroundColor,
            marginRight: 20,
          }}
        >
          <NavLink className="link" to={"/about"}>
            About
          </NavLink>
        </Button>
        <Button
          variant="contained"
          style={{ background: style?.layerOneBackgroundColor }}
        >
          <NavLink className="link" to={"/get-started"}>
            Get started
          </NavLink>
        </Button>
      </div>
    </>
  );
}
