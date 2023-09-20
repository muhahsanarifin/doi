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

// Get data history transaction action
const getHistoryTransactionOfDashboardPending = () => ({
  type: actionStrings.getHistoryTransactionOfDashboard.concat("-", Pending),
});

const getHistoryTransactionOfDashboardFulfilled = (data) => ({
  type: actionStrings.getHistoryTransactionOfDashboard.concat("-", Fulfilled),
  payload: { data },
});

const getHistoryTransactionOfDashboardError = (error) => ({
  type: actionStrings.getHistoryTransactionOfDashboard.concat("-", Rejected),
  payload: { error },
});

const getHistoryTransactionOfNotificationAction = (data) => ({
  type: actionStrings.getHistoryTransactionOfNotification,
  payload: { data },
});

const chtonAction = (data) => ({
  type: actionStrings.chton,
  payload: { data },
});

const chtadAction = () => ({
  type: actionStrings.chtad,
});

// Get data history transaction thunk
const getHistoryTransactionThunk = ({
  queryParams,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryTrasanctionPending());
      typeof cbPending === "function" && cbPending();
      const response = await historyTransaction(queryParams, accessToken);
      dispatch(getHistoryTransactionFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(getHistoryTransactionError(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Get data history transaction thunk
const getHistoryTransactionOfDashboardThunk = ({
  queryParams,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryTransactionOfDashboardPending());
      typeof cbPending === "function" && cbPending();
      const response = await historyTransaction(queryParams, accessToken);
      dispatch(getHistoryTransactionOfDashboardFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(getHistoryTransactionOfDashboardError(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const getHistoryTransactionOfNotificationThunk = () => {
  return async (dispatch) => {
    dispatch(getHistoryTransactionOfNotificationAction());
  };
};

const chtadThunk = () => {
  return async (dispatch) => {
    dispatch(chtadAction());
  };
};

const chtonThunk = () => {
  return async (dispatch) => {
    dispatch(chtonAction());
  };
};

const historyTransactionAction = {
  getHistoryTransactionThunk,
  getHistoryTransactionOfDashboardThunk,
  getHistoryTransactionOfNotificationThunk,
  chtadThunk,
  chtonThunk,
};

export default historyTransactionAction;
