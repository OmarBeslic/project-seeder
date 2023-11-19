import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api";
import useStore from "../store";

export default function Post() {
  const { post, updatePost } = useStore();
  let { id } = useParams();

  const fetchPost = async ({ id }) => {
    const data = await getPost({ id });
    updatePost(data);
  };

  useEffect(() => {
    // Fetch new data if post is not fetched or wrong post data is fetched
    if (!post || post?.id != id) {
      fetchPost({ id });
    }
    return () => {
      updatePost(null);
    };
  }, []);

  return (
    <>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 36,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {post?.title}
      </div>
      <div style={{ textAlign: "justify" }}>{post?.body}</div>
    </>
  );
}
