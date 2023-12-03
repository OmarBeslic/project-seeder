import axios from "axios";
const getAllPosts = () => {
  const postsBaseURL = `${API_BASE_URL}/posts`;
  return axios.get(postsBaseURL);
};

const postService = {
  getAllPosts,
};
export default postService;
