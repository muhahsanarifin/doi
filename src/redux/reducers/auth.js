import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  register: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  login: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  logout: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  forgotPassword: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  resetPassword: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  verify: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const authReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;

  const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verify,
    crd,
    caad,
  } = actionStrings;

  switch (type) {
    case register.concat("-", Pending):
      return {
        ...prevState,
        register: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case register.concat("-", Fulfilled):
      return {
        ...prevState,
        register: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case register.concat("-", Rejected): {
      return {
        ...prevState,
        register: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: payload.error.response?.data?.msg,
          err: null,
        },
      };
    }

    case login.concat("-", Pending):
      return {
        ...prevState,
        login: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case login.concat("-", Fulfilled):
      return {
        ...prevState,
        login: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case login.concat("-", Rejected): {
      return {
        ...prevState,
        login: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response?.data?.msg,
        },
      };
    }

    case logout.concat("-", Pending):
      return {
        ...prevState,
        logout: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case logout.concat("-", Fulfilled):
      return {
        ...prevState,
        logout: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case logout.concat("-", Rejected): {
      return {
        ...prevState,
        logout: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response?.data?.msg,
        },
      };
    }

    case forgotPassword.concat("-", Pending):
      return {
        ...prevState,
        forgotPassword: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case forgotPassword.concat("-", Fulfilled):
      return {
        ...prevState,
        forgotPassword: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case forgotPassword.concat("-", Rejected): {
      return {
        ...prevState,
        forgotPassword: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response?.data.msg,
        },
      };
    }

    case resetPassword.concat("-", Pending):
      return {
        ...prevState,
        resetPassword: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case resetPassword.concat("-", Fulfilled):
      return {
        ...prevState,
        resetPassword: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case resetPassword.concat("-", Rejected): {
      return {
        ...prevState,
        resetPassword: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response?.data.msg,
        },
      };
    }

    case verify.concat("-", Pending):
      return {
        ...prevState,
        verify: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case verify.concat("-", Fulfilled):
      return {
        ...prevState,
        verify: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case verify.concat("-", Rejected): {
      return {
        ...prevState,
        verify: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response?.data.msg,
        },
      };
    }

    case crd:
      return {
        ...prevState,
        register: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case caad: {
      return {
        ...prevState,
        register: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        login: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        logout: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        forgotPassword: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        resetPassword: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        verify: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    }

    default:
      return prevState;
  }
};

export default authReducer;
