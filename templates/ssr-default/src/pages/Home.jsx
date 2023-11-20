import useStore from "../store";

export default function Home() {
  const { style } = useStore();

  return (
    <>
      <h3 className="title">Home</h3>
      <img className="home-logo" src={style?.logo} />
    </>
  );
}
