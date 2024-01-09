// Need to use the React-specific entry point to import createApi
import {
  ICustomerRes,
  IDetailCustomerParams,
  IFilterCustomerParams,
  IResponseParams,
} from '@/types';
import { ResponseBase } from '@/utils';
import { api } from 'src/utils/api';

const apiWithTag = api.enhanceEndpoints({
  addTagTypes: ['ListCustomer', 'DetailCustomer'],
});
// Define a service using a base URL and expected endpoints
export const customerApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getListCustomer: build.mutation<
      any,
      IResponseParams<IFilterCustomerParams>
    >({
      query: (params) => ({
        url: `api/getListCustomer`,
        method: 'POST',
        data: params,
      }),
      providesTags: ['ListCustomer'] as any,
      transformResponse: (response: ResponseBase<ICustomerRes>) =>
        response?.data ?? null,
    }),
    updateUpdateCustomerInfo: build.mutation<
      any,
      IResponseParams<IDetailCustomerParams>
    >({
      query: (params) => ({
        url: `api/updateCustomerInfo`,
        method: 'POST',
        data: params,
      }),
      invalidatesTags: ['DetailCustomer'],
      transformResponse: (response: ResponseBase<any>) => {
        return response?.data ?? null;
      },
    }),
    getDetailCustomer: build.mutation<
      any,
      IResponseParams<IDetailCustomerParams>
    >({
      query: (params) => ({
        url: `api/getDetailCustomer`,
        method: 'POST',
        data: params,
      }),
      invalidatesTags: ['DetailCustomer'],
      transformResponse: (response: ResponseBase<any>) => {
        return response?.data ?? null;
      },
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListCustomerMutation,
  useGetDetailCustomerMutation,
  useUpdateUpdateCustomerInfoMutation,
} = customerApi;
