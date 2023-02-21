import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  register: {},
  login: {},
  logout: {},
  forgotPassword: {},
  resetPassword: {},
  verify: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const authReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;

  const { register, login, logout, forgotPassword, resetPassword, verify } =
    actionStrings;

  switch (type) {
    case register.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case register.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        register: payload.data,
        isError: false,
        err: null,
      };

    case register.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response?.data.msg, // <= Custome error message
      };
    }

    case login.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case login.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        login: payload.data,
        isError: false,
        err: null,
      };

    case login.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response?.data.msg, // <= Custome error message
      };
    }

    case logout.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case logout.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        logout: payload.data,
        isError: false,
        err: null,
      };

    case logout.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response?.data.msg, // <= Custome error message
      };
    }

    case forgotPassword.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case forgotPassword.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        forgotPassword: payload.data,
        isError: false,
        err: null,
      };

    case forgotPassword.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response?.data.msg, // <= Custome error message
      };
    }

    case resetPassword.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case resetPassword.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        resetPassword: payload.data,
        isError: false,
        err: null,
      };

    case resetPassword.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response?.data.msg, // <= Custome error message
      };
    }

    case verify.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case verify.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        verify: payload.data,
        isError: false,
        err: null,
      };

    case verify.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response?.data.msg, // <= Custome error message
      };
    }

    default:
      return prevState;
  }
};

export default authReducer;
