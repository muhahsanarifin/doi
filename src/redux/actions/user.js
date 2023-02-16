import { ActionType } from "redux-promise-middleware";
import Users from "../../utils/api/user";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;
const { dataUser } = Users;

// Get data user
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

// Get date receiver
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
      typeof cbError === "function" && cbError();
      dispatch(getDataUserRejected(error));
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
      typeof cbError === "function" && cbError();
      dispatch(getDataReceiverRejected(error));
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const usersAction = {
  getDataUserThunk,
  getDataReceiverThunk,
};

export default usersAction;
