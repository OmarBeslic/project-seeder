import { Card, Col, Row } from "antd";

import useStore from "../store";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "../api";

function BasicCard({ data }) {
  return (
    <Col xs={24} sm={12} md={8}>
      <Card
        title={data?.title}
        extra={<NavLink to={`/posts/${data?.id}`}>More</NavLink>}
        style={{ marginBottom: 20 }}
      >
        {data?.body}
      </Card>
    </Col>
  );
}

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
    <>
      <div
        style={{
          fontWeight: 200,
          fontSize: 36,
          marginTop: 20,
        }}
      >
        Posts
      </div>
      <Row gutter={16}>
        {posts?.map((post) => (
          <BasicCard key={post.id} data={post} />
        ))}
      </Row>
    </>
  );
}
