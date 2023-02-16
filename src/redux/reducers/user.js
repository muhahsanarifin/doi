import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getDataUser: {},
  getDataReceiver: {
    status: null,
    msg: null,
    data: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      image: null,
      noTlp: null,
      balance: null,
    },
  },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const usersReducer = (prevState = intialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { getDataUser, getDataReceiver } = actionStrings;
  switch (type) {
    case getDataUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case getDataUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        getDataUser: payload.data,
        isError: false,
        err: null,
      };

    case getDataUser.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.message, // <= Default error message
      };
    }
    case getDataReceiver.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case getDataReceiver.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        getDataReceiver: payload.data,
        isError: false,
        err: null,
      };

    case getDataReceiver.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.message, // <= Default error message
      };
    }

    default:
      return prevState;
  }
};

export default usersReducer;
