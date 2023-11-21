import { COOKIE_NAME_JWT } from "../types.js";
import { isClientSide } from "./helpers.js";

const MOCK_RESPONSES = {
  STYLES: {
    default: {
      htmlBackgroundColor: "#e5e5e5",
      htmlTextColor: "#242424",
      layerOneBackgroundColor: "#1ac9a1",
      layerOneTextColor: "#fff",
      layerTwoBackgroundColor: "#1ac9a1",
      layerTwoTextColor: "#fff",
      modalBackgroundColor: "",
      modalTextColor: "",
      logo: "/assets/img/logo.svg",
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
  };

  // Populate with successfull data or error
  try {
    const fetched = await fetch(url, {
      ...options,
      ...requiredOptions,
      headers,
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
export const login = async ({ identifier, password } = {}) => {
  // Login user
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

export const logout = async () => {
  // Logout user
  // const logoutUrl = `${API_BASE_URL}/logout`;
  // let loggedOut = await apiGet({ url: logoutUrl });

  // Clear JWT cookie
  document.cookie = `${COOKIE_NAME_JWT}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  return true;
};

export const getUsers = async () => {
  // Get all users
  const usersBaseURL = `${API_BASE_URL}/users`;
  let users = await fetch(usersBaseURL);
  users = await users.json();

  return users || false;
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
