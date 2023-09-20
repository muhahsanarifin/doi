import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getDataUsers: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getDataUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getDataReceiver: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  checkPinUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  updateProfileUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  updateImageUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  updatePinUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  updatePasswordUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  deleteImageUser: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
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
    ccpud,
    cuid,
    cupd,
    ccpd,
    cupud,
    cuad,
  } = actionStrings;
  switch (type) {
    // Get data users
    case getDataUsers.concat("-", Pending):
      return {
        ...prevState,
        getDataUsers: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case getDataUsers.concat("-", Fulfilled):
      return {
        ...prevState,
        getDataUsers: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case getDataUsers.concat("-", Rejected):
      return {
        ...prevState,
        getDataUsers: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.message,
        },
      };

    // Get data user
    case getDataUser.concat("-", Pending):
      return {
        ...prevState,
        getDataUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case getDataUser.concat("-", Fulfilled):
      return {
        ...prevState,
        getDataUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case getDataUser.concat("-", Rejected):
      return {
        ...prevState,
        getDataUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.message,
        },
      };

    // Get data receiver
    case getDataReceiver.concat("-", Pending):
      return {
        ...prevState,
        getDataReceiver: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case getDataReceiver.concat("-", Fulfilled):
      return {
        ...prevState,
        getDataReceiver: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case getDataReceiver.concat("-", Rejected):
      return {
        ...prevState,
        getDataReceiver: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.message,
        },
      };

    //  Check pin user
    case checkPinUser.concat("-", Pending):
      return {
        ...prevState,
        checkPinUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case checkPinUser.concat("-", Fulfilled):
      return {
        ...prevState,
        checkPinUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case checkPinUser.concat("-", Rejected):
      return {
        ...prevState,
        checkPinUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response.data?.msg,
        },
      };
    // Update profile user
    case updateProfileUser.concat("-", Pending):
      return {
        ...prevState,
        updateProfileUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case updateProfileUser.concat("-", Fulfilled):
      return {
        ...prevState,
        updateProfileUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case updateProfileUser.concat("-", Rejected):
      return {
        ...prevState,
        updateProfileUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error?.response?.data?.msg,
        },
      };

    // Update image user
    case updateImageUser.concat("-", Pending):
      return {
        ...prevState,
        updateImageUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case updateImageUser.concat("-", Fulfilled):
      return {
        ...prevState,
        updateImageUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case updateImageUser.concat("-", Rejected):
      return {
        ...prevState,
        updateImageUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error?.response?.data?.msg || payload.error.message,
        },
      };

    // Update pin user
    case updatePinUser.concat("-", Pending):
      return {
        ...prevState,
        updatePinUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case updatePinUser.concat("-", Fulfilled):
      return {
        ...prevState,
        updatePinUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case updatePinUser.concat("-", Rejected):
      return {
        ...prevState,
        updatePinUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error?.response?.data?.msg,
        },
      };

    // Update password user
    case updatePasswordUser.concat("-", Pending):
      return {
        ...prevState,
        updatePasswordUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case updatePasswordUser.concat("-", Fulfilled):
      return {
        ...prevState,
        updatePasswordUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case updatePasswordUser.concat("-", Rejected):
      return {
        ...prevState,
        updatePasswordUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response.data?.msg,
        },
      };

    // Dalete image user
    case deleteImageUser.concat("-", Pending):
      return {
        ...prevState,
        deleteImageUser: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case deleteImageUser.concat("-", Fulfilled):
      return {
        ...prevState,
        deleteImageUser: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case deleteImageUser.concat("-", Rejected):
      return {
        ...prevState,
        deleteImageUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response.data?.msg,
        },
      };

    case ccpud:
      return {
        ...prevState,
        checkPinUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case cuid:
      return {
        ...prevState,
        updateImageUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case cupd: {
      return {
        ...prevState,
        updateProfileUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    }

    case ccpd:
      return {
        ...prevState,
        updatePinUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case cupud:
      return {
        ...prevState,
        updatePasswordUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case cuad:
      return {
        ...prevState,
        getDataUsers: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        getDataUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        getDataReceiver: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        checkPinUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        updateProfileUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        updateImageUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        updatePinUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        updatePasswordUser: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        deleteImageUser: {
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

export default usersReducer;
