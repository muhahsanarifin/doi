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

const getDataUserThunk = (
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getDataUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await dataUser(id, accessToken);
      dispatch(getDataUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataUserRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const getDataReceiverThunk = (
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getDataReceiverPending());
      typeof cbPending === "function" && cbPending();
      const response = await dataUser(id, accessToken);
      dispatch(getDataReceiverFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataReceiverRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const getDataUsersThunk = (
  queryParams,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getDataUsersPending());
      typeof cbPending === "function" && cbPending();
      const response = await dataUsers(queryParams, accessToken);
      dispatch(getDataUsersFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataUsersRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const checkPinUserThunk = (
  pin,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(checkPinUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await checkPinUser(pin, accessToken);
      dispatch(checkPinUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response);
    } catch (error) {
      dispatch(checkPinUserRejected(error));
      typeof cbError === "function" && cbError(error.response);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const updateProfileUserThunk = (
  id,
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(updateProfileUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await updateProfileUser(id, body, accessToken);
      dispatch(updateProfileUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(updateProfileUserRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const updateImageUserThunk = (
  id,
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(updateImageUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await updateImageUser(id, body, accessToken);
      dispatch(updateImageUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(updateImageUserRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const updatePinUserThunk = (
  id,
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(updatePinUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await updatePinUser(id, body, accessToken);
      dispatch(updatePinUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(updatePinUserRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const updatePasswordUserThunk = (
  id,
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(updatePasswordUserPending());
      typeof cbPending === "function" && cbPending();
      const response = await updatePasswordUser(id, body, accessToken);
      dispatch(updatePasswordUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(updatedPasswordUserRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const deleteImageUserThunk = (
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError
) => {
  return async (dispatch) => {
    try {
      dispatch(deleteImageUserPending());
      typeof cbPending === "function" && cbPending();
      const response = deleteImageUser(id, accessToken);
      dispatch(deleteImageUserFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(deleteImageUserRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

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
};

export default usersAction;
