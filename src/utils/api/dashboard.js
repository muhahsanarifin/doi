import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DOI_BACKEND_API;

const config = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const getDataDashboard = (id, accessToken) =>
  Axios.get(`${BASE_URL}/dashboard/${id}`, config(accessToken));

export default getDataDashboard;
