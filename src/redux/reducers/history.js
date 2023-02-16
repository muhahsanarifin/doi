import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getHistoryTransaction: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const transactionHistoryReducer = (
  prevState = intialState,
  { payload, type }
) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { getHistoryTransaction } = actionStrings;
  switch (type) {
    case getHistoryTransaction.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };

    case getHistoryTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getHistoryTransaction: payload.data,
      };
    case getHistoryTransaction.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message, // <= Default error message
      };

    default:
      return prevState;
  }
};

export default transactionHistoryReducer;
