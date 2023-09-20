import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const intialState = {
  getHistoryTransaction: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getHistoryTransactionOfDashboard: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getHistoryTransactionOfNotification: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const transactionHistoryReducer = (
  prevState = intialState,
  { payload, type }
) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const {
    getHistoryTransaction,
    getHistoryTransactionOfDashboard,
    chtad,
    getHistoryTransactionOfNotification,
    chton,
  } = actionStrings;
  switch (type) {
    case getHistoryTransaction.concat("-", Pending):
      return {
        ...prevState,
        getHistoryTransaction: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case getHistoryTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        getHistoryTransaction: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case getHistoryTransaction.concat("-", Rejected):
      return {
        ...prevState,
        getHistoryTransaction: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.message,
        },
      };
    case getHistoryTransactionOfDashboard.concat("-", Pending):
      return {
        ...prevState,
        getHistoryTransactionOfDashboard: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case getHistoryTransactionOfDashboard.concat("-", Fulfilled):
      return {
        ...prevState,
        getHistoryTransactionOfDashboard: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
    case getHistoryTransactionOfDashboard.concat("-", Rejected):
      return {
        ...prevState,
        getHistoryTransactionOfDashboard: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.message,
        },
      };

    case getHistoryTransactionOfNotification:
      return {
        ...prevState,
        getHistoryTransactionOfNotification: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };
      
    case chton:
      return {
        ...prevState,
        getHistoryTransactionOfNotification: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case chtad:
      return {
        ...prevState,
        getHistoryTransaction: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        getHistoryTransactionOfDashboard: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    default:
      return prevState;
  }
};

export default transactionHistoryReducer;
