import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  transfer: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const transferReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;

  const { transfer } = actionStrings;

  switch (type) {
    case transfer.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case transfer.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        transfer: payload.data,
        isError: false,
        err: null,
      };

    case transfer.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data?.msg, // <= Custome error message
      };
    }
    default:
      return prevState;
  }
};

export default transferReducer;
