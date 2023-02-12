import { ActionType } from "redux-promise-middleware";
import getDataDashboard from "../../utils/api/dashboard";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Get data dashboard actions
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

// Get data dashboard thunk
const getDataDashboardThunk = (
  id,
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getDataDashboardPending());
      typeof cbPending === "function" && cbPending();
      const response = await getDataDashboard(id, accessToken);
      dispatch(getDataDashboardFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getDataDashboardError(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const dashboardAction = {
  getDataDashboardThunk,
};

export default dashboardAction;
