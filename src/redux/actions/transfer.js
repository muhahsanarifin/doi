import { ActionType } from "redux-promise-middleware";
import transfer from "../../utils/api/transfer";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Transfer action
const transferBalancePending = () => ({
  type: actionStrings.transfer.concat("-", Pending),
});

const transferBalanceFulfilled = (data) => ({
  type: actionStrings.transfer.concat("-", Fulfilled),
  payload: { data },
});

const transferBalanceRejected = (error) => ({
  type: actionStrings.transfer.concat("-", Rejected),
  payload: { error },
});

// Transfer confirmation
const transferConfrimationAction = (data) => ({
  type: actionStrings.transferConfirmation,
  payload: { data },
});

// Clear transfer data
const ctdAction = () => ({
  type: actionStrings.ctd,
});

// Clear transfer confirmation data
const ctcdAction = () => ({
  type: actionStrings.ctcd,
});

const ctadAction = () => ({
  type: actionStrings.ctad,
});

const transferBalanceUserThunk = ({
  body,
  accessToken,
  cbTBPending,
  cbTBFulfilled,
  cbTBRejected,
  cbTBFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(transferBalancePending());
      typeof cbTBPending === "function" && cbTBPending();
      const response = await transfer(body, accessToken);
      dispatch(transferBalanceFulfilled(response.data));
      typeof cbTBFulfilled === "function" && cbTBFulfilled();
    } catch (error) {
      dispatch(transferBalanceRejected(error));
      typeof cbTBRejected === "function" && cbTBRejected();
    } finally {
      typeof cbTBFinally === "function" && cbTBFinally();
    }
  };
};

const transferConfirmationThunk = (payload) => {
  return async (dispatch) => {
    dispatch(transferConfrimationAction(payload));
  };
};

const ctdThunk = () => {
  return async (dispatch) => {
    dispatch(ctdAction());
  };
};

const ctdcThunk = () => {
  return async (dispatch) => {
    dispatch(ctcdAction());
  };
};

const ctadThunk = () => {
  return async (dispatch) => {
    dispatch(ctadAction());
  };
};

const transferAction = {
  transferBalanceUserThunk,
  transferConfirmationThunk,
  ctdThunk,
  ctdcThunk,
  ctadThunk,
};

export default transferAction;
