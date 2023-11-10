import { isClientSide } from "./helpers.js";

const MOCK_RESPONSES = {
  STYLES: {
    default: {
      htmlBackgroundColor: "#6b6b6b",
      htmlTextColor: "#000",
      layerOneBackgroundColor: "",
      layerOneTextColor: "",
      layerTwoBackgroundColor: "",
      layerTwoTextColor: "",
      modalBackgroundColor: "",
      modalTextColor: "",
      contentBackgroundColor:
        "linear-gradient(337deg, rgba(25,32,40,1) 0%, rgba(45,57,71,1) 64%, rgba(107,59,27,1) 100%)",
      contentTextColor: "#fff",
      logo: "/assets/img/logo.png",
      contentHeight: "430px",
      contentWidth: "650px",
      fontFamily: "Inter",
      customStyle: ".withdraw-form .input-box.amount .action{ color: white; }",
    },
  },
  AUTH: {
    user: {
      id: 1,
      username: "vetar",
      firstName: "Petar",
      lastName: "Vološkin",
      token: "bbbbbbbbbbbbbb",
    },
  },
};

// Constants
const API_BASE_URL = isClientSide()
  ? import.meta.env.VITE_API_BASE_URL
  : process?.env?.VITE_API_BASE_URL;

// Base requests
const apiGet = async ({ url, headers, options }) => {
  // Prepare object to return
  let data = {
    success: false,
    data: null,
    error: null,
  };

  // Populate with successfull data or error
  try {
    const fetched = await fetch(url, { ...options, headers });
    data.data = await fetched.json();
    data.success = true;
  } catch (error) {
    data.error = error;
  }

  return data;
};

// const apiPost = async ({ url, headers, options }) => {};

// const apiPut = async ({ url, headers, options }) => {};

// Config requests
export const getStyle = async () => {
  // Fetch style from api
  // const styleUrl = `${API_BASE_URL}/style`;
  // let style = await fetch(styleUrl);
  // style = await style.json();

  // Return mock style
  const style = { data: MOCK_RESPONSES.STYLES.default };

  return style?.data || false;
};

// Specific api requests
export const login = async ({ identifier, password }) => {
  // Authenticate user with provided token
};

export const getUsers = async () => {
  // Get all users
  const usersBaseURL = `${API_BASE_URL}/users`;
  let users = await fetch(usersBaseURL);
  users = await users.json();

  return users || false;
};

export const getUser = async ({ id }) => {
  // Get user by id
  const userBaseURL = `${API_BASE_URL}/users/${id}`;
  let user = await fetch(userBaseURL);
  user = await user.json();

  return user || false;
};

export const getPosts = async () => {
  // Get all posts
  const postsBaseURL = `${API_BASE_URL}/posts`;
  let posts = await apiGet({ url: postsBaseURL });

  return posts?.data || false;
};

export const getPost = async ({ id = false } = {}) => {
  // Get post by id
  const postURL = `${API_BASE_URL}/posts/${id}`;
  let post = await apiGet({ url: postURL });

  return post?.data || false;
};
