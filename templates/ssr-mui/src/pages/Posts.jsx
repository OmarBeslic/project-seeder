import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import useStore from "../store";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "../api";

function BasicCard({ data }) {
  return (
    <Grid item xs={12} md={3} lg={4} style={{ marginTop: 20 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2">{data?.body}</Typography>
        </CardContent>
        <CardActions>
          <NavLink to={`/posts/${data?.id}`}>
            <Button size="small">Read More</Button>
          </NavLink>
        </CardActions>
      </Card>
    </Grid>
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
      <Grid container spacing={2}>
        {posts?.map((post) => (
          <BasicCard key={post.id} data={post} />
        ))}
      </Grid>
    </>
  );
}
