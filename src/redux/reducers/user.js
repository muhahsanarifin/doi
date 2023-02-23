import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getDataUsers: [],
  getDataUser: {},
  getDataReceiver: {},
  checkPinUser: {},
  updateProfileUser: {},
  updateImageUser: {},
  updatePinUser: {},
  updatePasswordUser: {},
  deleteImageUser: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const usersReducer = (prevState = intialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const {
    getDataUsers,
    getDataUser,
    getDataReceiver,
    checkPinUser,
    updateProfileUser,
    updateImageUser,
    updatePinUser,
    updatePasswordUser,
    deleteImageUser,
  } = actionStrings;
  switch (type) {
    case getDataUsers.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case getDataUsers.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        getDataUsers: payload.data,
        isError: false,
        err: null,
      };

    case getDataUsers.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.message, // <= Default error message
      };
    }
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

    case checkPinUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case checkPinUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        checkPinUser: payload.data,
        isError: false,
        err: null,
      };

    case checkPinUser.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        checkPinUser: payload.error.response.data?.msg, // <= Change state checkPinUser property especially put error msg as it's value.
        isError: true,
        err: payload.error.response.data?.msg, // <= Custome error message
      };
    }

    case updateProfileUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case updateProfileUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        updateProfileUser: payload.data,
        isError: false,
        err: null,
      };

    case updateProfileUser.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data?.msg, // <= Custome error message
      };
    }

    case updateImageUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case updateImageUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        updateImageUser: payload.data,
        isError: false,
        err: null,
      };

    case updateImageUser.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data?.msg, // <= Custome error message
      };
    }

    case updatePinUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case updatePinUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        updatePinUser: payload.data,
        isError: false,
        err: null,
      };

    case updatePinUser.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data?.msg, // <= Custome error message
      };
    }

    case updatePasswordUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case updatePasswordUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        updatePasswordUser: payload.data,
        isError: false,
        err: null,
      };

    case updatePasswordUser.concat("-", Rejected): {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data?.msg, // <= Custome error message
      };
    }

    case deleteImageUser.concat("-", Pending):
      return {
        ...prevState,
        err: null,
        isLoading: true,
        isFulfilled: false,
        isError: false,
      };
    case deleteImageUser.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        deleteImageUser: payload.data,
        isError: false,
        err: null,
      };

    case deleteImageUser.concat("-", Rejected): {
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

export default usersReducer;
