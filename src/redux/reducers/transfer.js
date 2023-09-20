import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  transfer: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  confirmationTransfer: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const transferReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;

  const { transfer, transferConfirmation, ctd, ctcd, ctad } = actionStrings;

  switch (type) {
    case transfer.concat("-", Pending):
      return {
        ...prevState,
        transfer: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    case transfer.concat("-", Fulfilled):
      return {
        ...prevState,
        transfer: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case transfer.concat("-", Rejected):
      return {
        ...prevState,
        transfer: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: null,
          err: payload.error.response?.data.msg,
        },
      };

    case transferConfirmation:
      return {
        ...prevState,
        confirmationTransfer: {
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: payload.data,
          err: null,
        },
      };

    case ctd:
      return {
        ...prevState,
        transfer: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case ctcd:
      return {
        ...prevState,
        confirmationTransfer: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };

    case ctad:
      return {
        ...prevState,
        transfer: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
        confirmationTransfer: {
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

export default transferReducer;
