export const actionStrings = {
  // Dashboard
  getDataDashboard: "DATA_DASHBOARD_GET",

  // History Transaction
  getHistoryTransaction: "HISTORY_TRANSACTION_GET",
  getHistoryTransactionOfDashboard: "HISTORY_TRANSACTION_OF_DASHBOARD_GET",
  getHistoryTransactionOfNotification: "HISTORY_TRANSACTION_OF_NOTIFICATION",

  // Users
  getDataUsers: "DATA_USERS_GET",
  getDataUser: "DATA_USER_GET",
  getDataReceiver: "DATA_RECEIVER_GET",
  checkPinUser: "PIN_USER_CHECK",
  updateProfileUser: "PROFILE_UPDATE_USER",
  updateImageUser: "IMAGE_USER_UPDATE",
  updatePinUser: "PIN_USER_UPDATE",
  updatePasswordUser: "USER_PASSWORD_UPDATE",
  deleteImageUser: "IMAGE_USER_DELETE",

  // Auth
  register: "REGISTER",
  login: "LOGIN",
  logout: "LOGOUT",
  forgotPassword: "FORGOT_PASSWORD",
  resetPassword: "RESET_PASSWORD",
  verify: "VERIFY",

  // Top Up
  topUp: "TOPUP",

  // Transfer
  transfer: "TRANSFER",
  transferConfirmation: "TRANSFER_CONFIRMATION",

  // Clear data
  ctd: "CLEAR_TRANSFER_DATA",
  ctcd: "CLEAR_TRANSFER_CONFIRMATION_DATA",
  ccpud: "CLEAR_CHECK_PIN_USER_DATA",
  cuid: "CLEAR_UPDATE_IMAGE_DATA",
  cupd: "CLEAR_UPDATE_PROFILE_DATA",
  ccpd: "CLEAR_CHANGE_PIN_DATA",
  cupud: "CLEAR_UPDATE_PASSWORD_USER_DATA",
  cfpd: "CLEAR_FORGOT_PASSWORD_DATA",
  crd: "CLEAR_REGISTER_DATA",
  chton: "CLEAR_HISTORY_TRANSACTION_OF_NOTIFICATION",

  // Clear all data
  cdad: "CLEAR_DASHBOARD_ALL_DATA",
  chtad: "CLEAR_HISTORY_TRANSACTION_ALL_DATA",
  caad: "CLEAR_AUTH_ALL_DATA",
  cuad: "CLEAR_USER_ALL_DATA",
  ctuad: "CLEAR_TOP_UP_ALL_DATA",
  ctad: "CLEAR_TRANSFER_ALL_DATA",
};
