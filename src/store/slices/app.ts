import { IAuth } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
import { IError } from 'src/utils';

interface IAppState {
  apiError: IError;
  isExpiredToken: boolean;
  loadingApp: boolean | null;
  auth?: IAuth;
}

const initialState: IAppState = {
  apiError: {},
  isExpiredToken: false,
  loadingApp: null,
  auth: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApiError: (state, { payload }: PayloadAction<IError>) => {
      state.apiError = payload;
    },
    clearApiError: (state) => {
      state.apiError = {};
    },

    setExpiredToken: (state, { payload }: PayloadAction<boolean>) => {
      state.isExpiredToken = payload;
    },
    setLoadingApp: (state, action: { payload: boolean }) => {
      state.loadingApp = action.payload;
    },
    updateAuth: (state, action: { payload: IAuth }) => {
      state.auth = action.payload;
    },
    clearAuth: (state) => {
      state.auth = {};
    },
  },
});

export const {
  setApiError,
  clearApiError,
  setExpiredToken,
  setLoadingApp,
  updateAuth,
  clearAuth,
} = appSlice.actions;

export const loadingApp = (state: RootState) => state.app.loadingApp;
export const auth = (state: RootState) => state.app.auth;
