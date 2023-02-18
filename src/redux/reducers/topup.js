import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  topUp: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const topUpReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { topUp } = actionStrings;

  switch (type) {
    case topUp.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case topUp.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        topUp: payload.data,
        isError: false,
        err: null,
      };

    case topUp.concat("-", Rejected): {
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

export default topUpReducer;
