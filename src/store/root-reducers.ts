import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'src/utils/api';
import { appSlice } from './slices/app';

const rootReducer = combineReducers({
  app: appSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
