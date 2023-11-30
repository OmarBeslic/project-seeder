import { COOKIE_NAME_JWT } from "../types.js";
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
      ctaBackgroundColor: "#c6680c",
      ctaTextColor: "#fff",
      logo: "/assets/img/logo.svg",
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
      jwt: "fojaifejqioowfqjhfufivq2147g2bdhwqhjvcag",
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

const apiGetAuthenticated = async ({
  url,
  headers = {},
  options = {},
} = {}) => {
  //
  const authenticationHeaders = {
    Authorization: "Bearer " + JWT,
  };
  const data = await apiGet({
    url,
    headers: { ...headers, ...authenticationHeaders },
    options,
  });

  return data;
};

const apiPost = async ({ url, headers, options }) => {
  // Prepare object to return
  let data = {
    success: false,
    data: null,
    error: null,
  };

  // Add default options
  const requiredOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + JWT,
      ...headers,
    },
  };

  // Populate with successfull data or error
  try {
    const fetched = await fetch(url, {
      ...options,
      ...requiredOptions,
    });
    data.data = await fetched.json();
    data.success = true;
  } catch (error) {
    data.error = error;
  }

  return data;
};

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
// Login user
export const login = async ({ identifier, password } = {}) => {
  // const loginUrl = `${API_BASE_URL}/login`;
  // let loggedIn = await apiPost({ url: loginUrl, options: { body: { identifier, password} } });

  // Return mock user
  const loggedIn = { data: MOCK_RESPONSES.AUTH.user };

  // If user logged in successfully save token to cookie to use it throughout app
  if (loggedIn?.data?.jwt) {
    document.cookie = `${COOKIE_NAME_JWT}=${loggedIn?.data?.jwt}; path=/; max-age=604800`;
  }

  return loggedIn?.data || false;
};

// Logout user
export const logout = async () => {
  // const logoutUrl = `${API_BASE_URL}/logout`;
  // let loggedOut = await apiGet({ url: logoutUrl });

  // Clear JWT cookie
  document.cookie = `${COOKIE_NAME_JWT}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  return true;
};

// Get all users
export const getUsers = async () => {
  const usersBaseURL = `${API_BASE_URL}/users`;
  let users = await apiGet({ url: usersBaseURL });

  return users?.data || false;
};

export const getUser = async () => {
  // Return null if JWT cookie not available
  const JWT =
    (globalThis.___COOKIES___ && globalThis.___COOKIES___[COOKIE_NAME_JWT]) ||
    null;
  if (!JWT) {
    return null;
  }

  // Get user
  // const userUrl = `${API_BASE_URL}/user`;
  // let user = await apiGetAuthenticated({ url: userUrl });

  // Return mock user
  const user = { data: MOCK_RESPONSES.AUTH.user };

  return user || false;
};

// Get all posts
export const getPosts = async () => {
  const postsBaseURL = `${API_BASE_URL}/posts`;
  let posts = await apiGet({ url: postsBaseURL });

  return posts?.data || false;
};

// Get post by id
export const getPost = async ({ id = false } = {}) => {
  const postURL = `${API_BASE_URL}/posts/${id}`;
  let post = await apiGet({ url: postURL });

  return post?.data || false;
};
