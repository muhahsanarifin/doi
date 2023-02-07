import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DOI_BACKEND_API;

const config = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const historyTransaction = (queryParams, accessToken) =>
  Axios.get(
    `${BASE_URL}/transaction/history?${queryParams}`,
    config(accessToken)
  );

export default historyTransaction;
