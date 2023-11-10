import { isClientSide } from "./helpers.js";

const MOCK_RESPONSES = {
  STYLES: {
    default: {
      htmlBackgroundColor: "#6b6b6b",
      htmlTextColor: "#000",
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
// const apiGet = async ({ url, headers, options }) => {};

// const apiPost = async ({ url, headers, options }) => {};

// const apiPut = async ({ url, headers, options }) => {};

// Config requests
export const getStyle = async () => {
  return new Promise(async (resolve) => {
    // Fetch style from api
    // const styleUrl = `${API_BASE_URL}/style`;
    // let style = await fetch(styleUrl);
    // style = await style.json();

    // Return mock style
    const style = { data: MOCK_RESPONSES.STYLES.default };

    resolve(style?.data);
  });
};

// Specific api requests
export const login = async ({ identifier, password }) => {
  return new Promise(async (resolve) => {
    // Authenticate user with provided token
  });
};

export const getUsers = async () => {
  return new Promise(async (resolve) => {
    // Get all users
    const userBaseURL = `${API_BASE_URL}/users`;
    let users = await fetch(userBaseURL);
    users = await users.json();

    resolve(users || false);
  });
};

export const getUser = async ({ id }) => {
  return new Promise(async (resolve) => {
    // Get user by id
    const userBaseURL = `${API_BASE_URL}/users/${id}`;
    let user = await fetch(userBaseURL);
    user = await user.json();

    resolve(user || false);
  });
};

export const getPosts = async () => {
  // Get all posts
  const userBaseURL = `${API_BASE_URL}/posts`;
  let posts = await fetch(userBaseURL);
  posts = await posts.json();

  return posts || false;
};

export const getPost = async ({ token = false, id = false } = {}) => {
  // Authenticate user with provided token
  const userBaseURL = `${API_BASE_URL}/posts/${id}`;
  let auth = await fetch(userBaseURL);
  auth = await auth.json();

  return auth.data || false;
};
