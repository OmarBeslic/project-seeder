import useStore from "../store";

export default function Dashboard() {
  const { style } = useStore();

  return (
    <>
      <div className="header">
        <img className="logo" src={style?.logo} />
      </div>
      <div className="content">Dashboard</div>
      <div className="footer">
        Powered by{" "}
        <span className="brand-title">PLACEHOLDER_PROJECT_FOLDER</span>
      </div>
    </>
  );
}
