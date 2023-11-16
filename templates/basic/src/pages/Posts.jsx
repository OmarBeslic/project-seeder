import useStore from "../store";

export default function Posts() {
  const { posts } = useStore();

  console.log("posts", posts?.length);

  return <div>PLACEHOLDER_PROJECT_FOLDER</div>;
}
