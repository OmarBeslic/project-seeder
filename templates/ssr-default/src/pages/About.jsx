import useStore from "../store";

export default function About() {
  const { style } = useStore();

  return (
    <>
      <div className="header">
        <img className="header-logo" src={style?.logo} />
      </div>
      <div className="content">About</div>
      <div className="footer">
        Powered by{" "}
        <span className="brand-title">PLACEHOLDER_PROJECT_FOLDER</span>
      </div>
    </>
  );
}
