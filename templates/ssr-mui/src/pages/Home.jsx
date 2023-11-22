import useStore from "../store";

export default function Home() {
  const { style } = useStore();

  return (
    <>
      <div style={{ fontWeight: 200, fontSize: 36, marginTop: 40 }}>
        Home
      </div>
      <img className="home-logo" src={style?.logo} />
    </>
  );
}
