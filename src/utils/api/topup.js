import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DOI_BACKEND_API;

const config = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const topUp = (body, accessToken) =>
  Axios.post(`${BASE_URL}/transaction/top-up`, body, config(accessToken));

export default topUp;
