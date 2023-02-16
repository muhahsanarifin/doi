import { ActionType } from "redux-promise-middleware";
import historyTransaction from "../../utils/api/history";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Get data history transaction action
const getHistoryTrasanctionPending = () => ({
  type: actionStrings.getHistoryTransaction.concat("-", Pending),
});

const getHistoryTransactionFulfilled = (data) => ({
  type: actionStrings.getHistoryTransaction.concat("-", Fulfilled),
  payload: { data },
});

const getHistoryTransactionError = (error) => ({
  type: actionStrings.getHistoryTransaction.concat("-", Rejected),
  payload: { error },
});

// Get data history transaction thunk
const getHistoryTransactionThunk = (
  queryParams,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryTrasanctionPending());
      typeof cbPending === "function" && cbPending();
      const response = await historyTransaction(queryParams, accessToken);
      dispatch(getHistoryTransactionFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(getHistoryTransactionError(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const historyTransactionAction = {
  getHistoryTransactionThunk,
};

export default historyTransactionAction;
