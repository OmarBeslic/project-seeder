import useStore from "../store";

export default function Post() {
  const { post } = useStore();

  console.log("post", post);

  return <div>PLACEHOLDER_PROJECT_FOLDER</div>;
}
