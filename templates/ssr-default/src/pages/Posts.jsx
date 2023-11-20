import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getPosts } from "../api";
import useStore from "../store";

const PostItem = ({ data }) => {
  return (
    <div className="post-item-wrapper">
      <div className="post-item-title">{data?.title}</div>
      <div className="post-item-body">{data?.body}</div>
      <NavLink to={`/posts/${data?.id}`} className="post-item-link link">
        Read more
      </NavLink>
    </div>
  );
};

export default function Posts() {
  const { posts, updatePosts } = useStore();

  const fetchPosts = async () => {
    const data = await getPosts();
    updatePosts(data);
  };

  useEffect(() => {
    // Fetch new data if posts are not already fetched
    if (!posts) {
      fetchPosts();
    }
  }, []);

  return (
    <div>
      {posts?.map((post) => (
        <PostItem key={post.id} data={post} />
      ))}
    </div>
  );
}
