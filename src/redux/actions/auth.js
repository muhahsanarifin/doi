import { ActionType } from "redux-promise-middleware";
import Auth from "../../utils/api/auth";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;
const { register, login, logout, forgotPassword, resetPassword, verify } = Auth;

// Register action
const registerPending = () => ({
  type: actionStrings.register.concat("-", Pending),
});

const registerFulfilled = (data) => ({
  type: actionStrings.register.concat("-", Fulfilled),
  payload: { data },
});

const registerRejected = (error) => ({
  type: actionStrings.register.concat("-", Rejected),
  payload: { error },
});

// Login action
const loginPending = () => ({
  type: actionStrings.login.concat("-", Pending),
});

const loginFulfilled = (data) => ({
  type: actionStrings.login.concat("-", Fulfilled),
  payload: { data },
});

const loginRejected = (error) => ({
  type: actionStrings.login.concat("-", Rejected),
  payload: { error },
});

// Logout action
const logoutPending = () => ({
  type: actionStrings.logout.concat("-", Pending),
});

const logoutFulfilled = (data) => ({
  type: actionStrings.logout.concat("-", Fulfilled),
  payload: { data },
});

const logoutRejected = (error) => ({
  type: actionStrings.logout.concat("-", Rejected),
  payload: { error },
});

// Forgot password action
const forgotPasswordPending = () => ({
  type: actionStrings.forgotPassword.concat("-", Pending),
});

const forgotPasswordFulfilled = (data) => ({
  type: actionStrings.forgotPassword.concat("-", Fulfilled),
  payload: { data },
});

const forgotPasswordRejected = (error) => ({
  type: actionStrings.forgotPassword.concat("-", Rejected),
  payload: { error },
});

// Reset password action
const resetPasswordPending = () => ({
  type: actionStrings.resetPassword.concat("-", Pending),
});

const resetPasswordFulfilled = (data) => ({
  type: actionStrings.resetPassword.concat("-", Fulfilled),
  payload: { data },
});

const resetPasswordRejected = (error) => ({
  type: actionStrings.resetPassword.concat("-", Rejected),
  payload: { error },
});

// Verify action
const verifyPending = () => ({
  type: actionStrings.verify.concat("-", Pending),
});

const verifyFulfilled = (data) => ({
  type: actionStrings.verify.concat("-", Fulfilled),
  payload: { data },
});

const verifyRejected = (error) => ({
  type: actionStrings.verify.concat("-", Rejected),
  payload: { error },
});

const registerThunk = (body, cbPending, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(registerPending());
      typeof cbPending === "function" && cbPending();
      const response = await register(body);
      dispatch(registerFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(registerRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const loginThunk = (body, cbPending, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      typeof cbPending === "function" && cbPending();
      const response = await login(body);
      dispatch(loginFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(loginRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const logoutThunk = (
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      typeof cbPending === "function" && cbPending();
      const response = await logout(accessToken);
      dispatch(logoutFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(logoutRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const forgotPasswordThunk = (
  body,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordPending());
      typeof cbPending === "function" && cbPending();
      const response = await forgotPassword(body);
      dispatch(forgotPasswordFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(forgotPasswordRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const resetPasswordThunk = (
  body,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(resetPasswordPending());
      typeof cbPending === "function" && cbPending();
      const response = await resetPassword(body);
      dispatch(resetPasswordFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(resetPasswordRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const verifyThunk = (
  pin,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(verifyPending());
      typeof cbPending === "function" && cbPending();
      const response = await verify(pin, accessToken);
      dispatch(verifyFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(verifyRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const authsAction = {
  registerThunk,
  loginThunk,
  logoutThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  verifyThunk,
};

export default authsAction;
