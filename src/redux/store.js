import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers/index";
import logger from "redux-logger";

const persitConfig = {
  key: "doi",
  storage,
};

const persistedReducer = persistReducer(persitConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false })
  .concat(
    logger
  ),
});

export const persistedStore = persistStore(store);

export default store;
