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

const transferBalanceUserThunk = (
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError
) => {
  return async (dispatch) => {
    try {
      dispatch(transferBalancePending());
      typeof cbPending === "function" && cbPending();
      const response = await transfer(body, accessToken);
      dispatch(transferBalanceFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(transferBalanceRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

const transferConfirmationThunk = (payload) => {
  return async (dispatch) => {
    dispatch(transferConfrimationAction(payload));
  };
};

const transferAction = {
  transferBalanceUserThunk,
  transferConfirmationThunk,
};

export default transferAction;
