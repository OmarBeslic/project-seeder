import useStore from "../store";

export default function Dashboard() {
  const { style } = useStore();

  return (
    <>
      <div className="content">Dashboard</div>
    </>
  );
}
