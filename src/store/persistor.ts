import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from './reducers/root';
import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger";


const options = {
  diff: true,
  collapsed: true,
};

const logger = createLogger(options);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  timeout: __DEV__ ? 3000 : 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(logger)
});
export const persistor = persistStore(store);
