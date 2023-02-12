import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getDataDashboard: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const dashboardReducer = (prevState = intialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { getDataDashboard } = actionStrings;
  switch (type) {
    case getDataDashboard.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getDataDashboard.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getDataDashboard: payload.data.response,
      };
    case getDataDashboard.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.data.response?.data.msg, // <= Custome error message
      };
    default:
      return prevState;
  }
};

export default dashboardReducer;
