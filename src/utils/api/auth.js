import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DOI_BACKEND_API;

const config = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

// Register
const register = (body) => Axios.post(`${BASE_URL}/auth/register`, body);

// Login
const login = (body) => Axios.post(`${BASE_URL}/auth/login`, body);

// Logout
const logout = (accessToken) =>
  Axios.post(`${BASE_URL}/auth/logout`, config(accessToken));

// Forgot Password
const forgotPassword = (body) =>
  Axios.post(`${BASE_URL}/auth/forgot-password`, body);

// Reset Password
const resetPassword = (body) =>
  Axios.patch(`${BASE_URL}/auth/reset-password`, body);

// Verify
const verify = (pin, accessToken) =>
  Axios.get(`${BASE_URL}/${pin}`, config(accessToken));

const Auth = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verify,
};

export default Auth;
