import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './user/UserReducer';
import PayReducer from './PayModal/PayReducer';

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  PayReducer: PayReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
