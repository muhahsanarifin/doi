import { ActionType } from "redux-promise-middleware";
import topUp from "../../utils/api/topup";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Top Up action
const topUpPending = () => ({
  type: actionStrings.topUp.concat("-", Pending),
});

const topUpFulfilled = (data) => ({
  type: actionStrings.topUp.concat("-", Fulfilled),
  payload: { data },
});

const topUpRejected = (error) => ({
  type: actionStrings.topUp.concat("-", Rejected),
  payload: { error },
});

const topUpThunk = (
  body,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(topUpPending());
      typeof cbPending === "function" && cbPending();
      const response = await topUp(body, accessToken);
      dispatch(topUpFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response);
    } catch (error) {
      dispatch(topUpRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const topUpAction = {
  topUpThunk,
};

export default topUpAction;
