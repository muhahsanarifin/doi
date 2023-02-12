import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DOI_BACKEND_API;

const config = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const dataUsers = (queryParams, accessToken) =>
  Axios.get(`${BASE_URL}/user?${queryParams}`, config(accessToken));

const dataUser = (id, accessToken) =>
  Axios.get(`${BASE_URL}/user/profile/${id}`, config(accessToken));

const checkPinUser = (pin, accessToken) =>
  Axios.get(`${BASE_URL}/user/pin/${pin}`, config(accessToken));

const updateProfileUser = (id, body, accessToken) =>
  Axios.patch(`${BASE_URL}/user/profile${id}`, body, config(accessToken)); // <- It's used by Update Firstname, Lastname and including No Telp.

const updateImageUser = (id, body, accessToken) =>
  Axios.patch(`${BASE_URL}/user/image/${id}`, body, config(accessToken));

const updatePinUser = (id, body, accessToken) =>
  Axios.patch(`${BASE_URL}/user/pin/${id}`, body, config(accessToken));

const updatePasswordUser = (id, body, accessToken) =>
  Axios.patch(`${BASE_URL}/user/password/${id}`, body, config(accessToken));

const deleteImageUser = (id, accessToken) =>
  Axios.delete(`${BASE_URL}/user/image/${id}`, config(accessToken));

const Users = {
  dataUsers,
  dataUser,
  checkPinUser,
  updateProfileUser,
  updateImageUser,
  updatePinUser,
  updatePasswordUser,
  deleteImageUser,
};

export default Users;
