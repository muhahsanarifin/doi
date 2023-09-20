import { ActionType } from "redux-promise-middleware";
import getDataDashboard from "../../utils/api/dashboard";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Get data dashboard action
const getDataDashboardPending = () => ({
  type: actionStrings.getDataDashboard.concat("-", Pending),
});

const getDataDashboardFulfilled = (data) => ({
  type: actionStrings.getDataDashboard.concat("-", Fulfilled),
  payload: { data },
});

const getDataDashboardError = (error) => ({
  type: actionStrings.getDataDashboard.concat("-", Rejected),
  payload: { error },
});

const cdadAction = () => ({
  type: actionStrings.cdad,
});

// Get data dashboard thunk
const getDataDashboardThunk = ({
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbRejected,
  cbFinally,
}) => {
  return async (dispatch) => {
    try {
      dispatch(getDataDashboardPending());
      typeof cbPending === "function" && cbPending();
      const response = await getDataDashboard(id, accessToken);
      dispatch(getDataDashboardFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
    } catch (error) {
      dispatch(getDataDashboardError(error));
      typeof cbRejected === "function" && cbRejected();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const cdadThunk = () => {
  return async (dispatch) => {
    dispatch(cdadAction());
  };
};

const dashboardAction = {
  getDataDashboardThunk,
  cdadThunk,
};

export default dashboardAction;
