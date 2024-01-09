import { IGetUserInfoParam, ILoginParam, IResponseParams } from '@/types';
import { ResponseBase } from 'src/utils';
import { api } from 'src/utils/api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ResponseBase<any>, IResponseParams<ILoginParam>>({
      query: (body) => {
        return {
          url: `api/login`,
          method: 'POST',
          data: body,
        };
      },
    }),
    getUserInfo: build.mutation<
      ResponseBase<any>,
      IResponseParams<IGetUserInfoParam>
    >({
      query: (body) => {
        return {
          url: `api/auth/getUserInfo`,
          method: 'POST',
          data: body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const { useLoginMutation, useGetUserInfoMutation } = authApi;
