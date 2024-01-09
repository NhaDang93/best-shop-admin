// Need to use the React-specific entry point to import createApi
import { IStatusContact } from '@/types';
import { ResponseBase } from '@/utils';
import { api } from 'src/utils/api';

const apiWithTag = api.enhanceEndpoints({
  addTagTypes: ['StatusContact', 'ListMonth'],
});
// Define a service using a base URL and expected endpoints
export const commonApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getListYear: build.mutation<any, any>({
      query: (params) => ({
        url: `api/common/getListYear`,
        method: 'POST',
        data: params,
      }),
      invalidatesTags: ['StatusContact'],
      transformResponse: (response: ResponseBase<IStatusContact>) =>
        response?.data ?? null,
    }),
    getListMonth: build.mutation<any, any>({
      query: (params) => ({
        url: `api/common/getListMonth`,
        method: 'POST',
        data: params,
      }),
      invalidatesTags: ['ListMonth'],
      transformResponse: (response: ResponseBase<IStatusContact>) =>
        response?.data ?? null,
    }),
  }),

  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListYearMutation, useGetListMonthMutation } = commonApi;
