import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  topUp: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const topUpReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { topUp, ctuad } = actionStrings;

  switch (type) {
    case topUp.concat("-", Pending):
      return {
        ...prevState,
        topUp: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case topUp.concat("-", Fulfilled):
      return {
        ...prevState,
        topUp: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case topUp.concat("-", Rejected): {
      return {
        ...prevState,
        topUp: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response.data?.msg,
        },
      };
    }

    case ctuad:
      return {
        ...prevState,
        topUp: {
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

export default topUpReducer;
