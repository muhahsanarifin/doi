import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getDataDashboard: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const dashboardReducer = (prevState = intialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { getDataDashboard, cdad } = actionStrings;
  switch (type) {
    case getDataDashboard.concat("-", Pending):
      return {
        ...prevState,
        getDataDashboard: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case getDataDashboard.concat("-", Fulfilled):
      return {
        ...prevState,
        getDataDashboard: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case getDataDashboard.concat("-", Rejected):
      return {
        ...prevState,
        getDataDashboard: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.message,
        },
      };
    case cdad:
      return {
        ...prevState,
        getDataDashboard: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    default:
      return prevState;
  }
};

export default dashboardReducer;
