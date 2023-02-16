import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard";
import transactionHistoryReducer from "./history";
import usersReducer from "./user";

export default combineReducers({
  dashboard: dashboardReducer,
  historyTransaction: transactionHistoryReducer,
  users: usersReducer,
});
