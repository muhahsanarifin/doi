import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import usersReducer from "./user";
import dashboardReducer from "./dashboard";
import transactionHistoryReducer from "./history";
import topUpReducer from "./topup";
import transferReducer from "./transfer";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  historyTransaction: transactionHistoryReducer,
  users: usersReducer,
  topUp: topUpReducer,
  transfer: transferReducer,
});
