import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'src/utils/api';
import { appSlice } from './slices/app';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice.reducer,
});

export default rootReducer;
