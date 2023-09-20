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

const ctuadAction = () => ({
  type: actionStrings.ctuad,
});

const topUpThunk = ({
  body,
  accessToken,
  cbTUPending,
  cbTUFulfilled,
  cbTURejected,
  cbTUFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(topUpPending());
      typeof cbTUPending === "function" && cbTUPending();
      const response = await topUp(body, accessToken);
      dispatch(topUpFulfilled(response.data));
      typeof cbTUFulfilled === "function" && cbTUFulfilled(response);
    } catch (error) {
      dispatch(topUpRejected(error));
      typeof cbTURejected === "function" && cbTURejected(error);
    } finally {
      typeof cbTUFinally === "function" && cbTUFinally();
    }
  };
};

const ctuadThunk = () => {
  return async (dispatch) => {
    dispatch(ctuadAction());
  };
};

const topUpAction = {
  topUpThunk,
  ctuadThunk,
};

export default topUpAction;
