import useStore from "../store";

export default function Post() {
  const { post } = useStore();

  console.log("post", post?.id);

  return <div>PLACEHOLDER_PROJECT_FOLDER</div>;
}
