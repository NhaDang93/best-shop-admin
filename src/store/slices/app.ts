import { ICategory, IProduct } from '@/containers';
import { IError } from '@/types';
import { IAuth } from '@/types/auth';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

interface IAppState {
  loading: boolean;
  products: ICategory[];
  product: IProduct | undefined;
  search: string;
  apiError: IError;
  isExpiredToken: boolean;
  loadingApp: boolean | null;
  auth?: IAuth;
}

const initialState: IAppState = {
  loading: false,
  products: [],
  product: undefined,
  search: '',
  apiError: {},
  isExpiredToken: false,
  loadingApp: null,
  auth: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    getListProduct: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.products = payload;
    },

    updateListProduct: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.products = payload;
    },
    productSelect: (state, { payload }: PayloadAction<number | undefined>) => {
      if (payload) {
        state.products.forEach((_products) => {
          const productProcess: IProduct | undefined =
            _products?.products?.find(
              (_productProcess) => _productProcess?.id === payload
            );
          if (productProcess) {
            state.product = productProcess;
          }
        });
      }
    },
    productClear: (state) => {
      state.product = undefined;
    },
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
  setLoading,
  getListProduct,
  updateListProduct,
  productSelect,
  productClear,
  setApiError,
  clearApiError,
  setExpiredToken,
  setLoadingApp,
  updateAuth,
  clearAuth,
  setSearch,
} = appSlice.actions;
export const appActions = {
  appSlice,
};

export const loading = (state: RootState) => state.app.loading;
export const productList = (state: RootState) => state.app.products;
export const product = (state: RootState) => state.app.product;
export const search = (state: RootState) => state.app.search;
