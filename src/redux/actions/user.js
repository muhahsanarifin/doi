import { ActionType } from "redux-promise-middleware";
import Users from "../../utils/api/user";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;
const {
  dataUsers,
  dataUser,
  checkPinUser,
  updateProfileUser,
  updateImageUser,
  updatePinUser,
  updatePasswordUser,
  deleteImageUser,
} = Users;

// Get data users action
const getDataUsersPending = () => ({
  type: actionStrings.getDataUsers.concat("-", Pending),
});

const getDataUsersFulfilled = (data) => ({
  type: actionStrings.getDataUsers.concat("-", Fulfilled),
  payload: { data },
});

const getDataUsersRejected = (error) => ({
  type: actionStrings.getDataUsers.concat("-", Fulfilled),
  payload: { error },
});

// Get data user action
const getDataUserPending = () => ({
  type: actionStrings.getDataUser.concat("-", Pending),
});

const getDataUserFulfilled = (data) => ({
  type: actionStrings.getDataUser.concat("-", Fulfilled),
  payload: { data },
});

const getDataUserRejected = (error) => ({
  type: actionStrings.getDataUser.concat("-", Rejected),
  payload: { error },
});

// Get date receiver action
const getDataReceiverPending = () => ({
  type: actionStrings.getDataReceiver.concat("-", Pending),
});

const getDataReceiverFulfilled = (data) => ({
  type: actionStrings.getDataReceiver.concat("-", Fulfilled),
  payload: { data },
});

const getDataReceiverRejected = (error) => ({
  type: actionStrings.getDataReceiver.concat("-", Rejected),
  payload: { error },
});

// Check pin user action
const checkPinUserPending = () => ({
  type: actionStrings.checkPinUser.concat("-", Pending),
});

const checkPinUserFulfilled = (data) => ({
  type: actionStrings.checkPinUser.concat("-", Fulfilled),
  payload: { data },
});

const checkPinUserRejected = (error) => ({
  type: actionStrings.checkPinUser.concat("-", Rejected),
  payload: { error },
});

// Update profile user action
const updateProfileUserPending = () => ({
  type: actionStrings.updateProfileUser.concat("-", Pending),
});

const updateProfileUserFulfilled = (data) => ({
  type: actionStrings.updateProfileUser.concat("-", Fulfilled),
  payload: { data },
});

const updateProfileUserRejected = (error) => ({
  type: actionStrings.updateProfileUser.concat("-", Rejected),
  payload: { error },
});

// Update image user action
const updateImageUserPending = () => ({
  type: actionStrings.updateImageUser.concat("-", Pending),
});

const updateImageUserFulfilled = (data) => ({
  type: actionStrings.updateImageUser.concat("-", Fulfilled),
  payload: { data },
});

const updateImageUserRejected = (error) => ({
  type: actionStrings.updateImageUser.concat("-", Rejected),
  payload: { error },
});

// Update pin user action
const updatePinUserPending = () => ({
  type: actionStrings.updatePinUser.concat("-", Pending),
});

const updatePinUserFulfilled = (data) => ({
  type: actionStrings.updatePinUser.concat("-", Fulfilled),
  payload: { data },
});

const updatePinUserRejected = (error) => ({
  type: actionStrings.updatePinUser.concat("-", Rejected),
  payload: { error },
});

// Update password user action
const updatePasswordUserPending = () => ({
  type: actionStrings.updatePasswordUser.concat("-", Pending),
});

const updatePasswordUserFulfilled = (data) => ({
  type: actionStrings.updatePasswordUser.concat("-", Fulfilled),
  payload: { data },
});

const updatedPasswordUserRejected = (error) => ({
  type: actionStrings.updatePasswordUser.concat("-", Rejected),
  payload: { error },
});

// Delete image user action
const deleteImageUserPending = () => ({
  type: actionStrings.deleteImageUser.concat("-", Pending),
});

const deleteImageUserFulfilled = (data) => ({
  type: actionStrings.deleteImageUser.concat("-", Fulfilled),
  payload: { data },
});

const deleteImageUserRejected = (error) => ({
  type: actionStrings.deleteImageUser.concat("-", Rejected),
  payload: { error },
});

// Clear check pin user data
const ccpudAction = () => ({
  type: actionStrings.ccpud,
});

// Clear change pin data
const ccpdAction = () => ({
  type: actionStrings.ccpd,
});

// Clear update password user data
const cupudAction = () => ({
  type: actionStrings.cupud,
});

// Clear update image data
const cuidAction = () => ({
  type: actionStrings.cuid,
});

// Clear update profile data
const cupdAction = () => ({
  type: actionStrings.cupd,
});

// Clear user all data
const cuadAction = () => ({
  type: actionStrings.cuad,
});

const getDataUserThunk = ({
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(getDataUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await dataUser(id, accessToken);
      dispatch(getDataUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataUserRejected(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const getDataReceiverThunk = ({
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(getDataReceiverPending());
      typeof cbPending === "function" && cbPending();
      const response = await dataUser(id, accessToken);
      dispatch(getDataReceiverFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataReceiverRejected(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const getDataUsersThunk = ({
  queryParams,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(getDataUsersPending());
      typeof cbPending === "function" && cbPending();
      const response = await dataUsers(queryParams, accessToken);
      dispatch(getDataUsersFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataUsersRejected(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const checkPinUserThunk = ({
  pin,
  accessToken,
  cbCPUPending,
  cbCPUFulfilled,
  cbCPURejected,
  cbCPUFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(checkPinUserPending());
      typeof cbCPUPending === "function" && cbCPUPending();
      const response = await checkPinUser(pin, accessToken);
      dispatch(checkPinUserFulfilled(response.data));
      typeof cbCPUFulfilled === "function" && cbCPUFulfilled(response);
    } catch (error) {
      dispatch(checkPinUserRejected(error));
      typeof cbCPURejected === "function" && cbCPURejected(error.response);
    } finally {
      typeof cbCPUFinally === "function" && cbCPUFinally();
    }
  };
};

const updateProfileUserThunk = ({
  id,
  body,
  accessToken,
  cbUPUPending,
  cbUPUFulfilled,
  cbUPURejected,
  cbUPUFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(updateProfileUserPending());
      typeof cbUPUPending === "function" && cbUPUPending();
      const response = await updateProfileUser(id, body, accessToken);
      dispatch(updateProfileUserFulfilled(response.data));
      typeof cbUPUFulfilled === "function" && cbUPUFulfilled(response.data);
    } catch (error) {
      dispatch(updateProfileUserRejected(error));
      typeof cbUPURejected === "function" && cbUPURejected(error);
    } finally {
      typeof cbUPUFinally === "function" && cbUPUFinally();
    }
  };
};

const updateImageUserThunk = ({
  id,
  body,
  accessToken,
  cbUIUPending,
  cbUIUFulfilled,
  cbUIURejected,
  cbUIUFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(updateImageUserPending());
      typeof cbUIUPending === "function" && cbUIUPending();
      const response = await updateImageUser(id, body, accessToken);
      dispatch(updateImageUserFulfilled(response.data));
      typeof cbUIUFulfilled === "function" && cbUIUFulfilled(response.data);
    } catch (error) {
      dispatch(updateImageUserRejected(error));
      typeof cbUIURejected === "function" && cbUIURejected();
    } finally {
      typeof cbUIUFinally === "function" && cbUIUFinally();
    }
  };
};

const updatePinUserThunk = ({
  id,
  body,
  accessToken,
  cbUPUPending,
  cbUPUFulfilled,
  cbUPURejected,
  cbUPUFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(updatePinUserPending());
      typeof cbUPUPending === "function" && cbUPUPending();
      const response = await updatePinUser(id, body, accessToken);
      dispatch(updatePinUserFulfilled(response.data));
      typeof cbUPUFulfilled === "function" && cbUPUFulfilled(response.data);
    } catch (error) {
      dispatch(updatePinUserRejected(error));
      typeof cbUPURejected === "function" && cbUPURejected(error);
    } finally {
      typeof cbUPUFinally === "function" && cbUPUFinally();
    }
  };
};

const updatePasswordUserThunk = ({
  id,
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(updatePasswordUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await updatePasswordUser(id, body, accessToken);
      dispatch(updatePasswordUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(updatedPasswordUserRejected(error));
      typeof cbRejected === "function" && cbRejected(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const deleteImageUserThunk = ({
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(deleteImageUserPending());
      typeof cbPending === "function" && cbPending();
      const response = deleteImageUser(id, accessToken);
      dispatch(deleteImageUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(deleteImageUserRejected(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const ccpudThunk = () => {
  return async (dispatch) => {
    dispatch(ccpudAction());
  };
};

const ccpdThunk = () => {
  return async (dispatch) => {
    dispatch(ccpdAction());
  };
};

const cuidThunk = () => {
  return async (dispatch) => {
    dispatch(cuidAction());
  };
};

const cupdThunk = () => {
  return async (dispatch) => {
    dispatch(cupdAction());
  };
};

const cuadThunk = () => {
  return async (dispatch) => {
    dispatch(cuadAction());
  };
};

const cupudThunk = () => {
  return async (dispatch) => {
    dispatch(cupudAction())
  }
}

const usersAction = {
  getDataUsersThunk,
  getDataUserThunk,
  getDataReceiverThunk,
  checkPinUserThunk,
  updateProfileUserThunk,
  updateImageUserThunk,
  updatePinUserThunk,
  updatePasswordUserThunk,
  deleteImageUserThunk,
  ccpudThunk,
  ccpdThunk,
  cupudThunk,
  cuidThunk,
  cupdThunk,
  cuadThunk,
};

export default usersAction;
