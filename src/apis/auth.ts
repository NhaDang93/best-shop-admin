import { ILogin, ILoginParam, IResponseParams } from '@/types';
import { ResponseBase } from 'src/utils';
import { api } from 'src/utils/api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ResponseBase<ILogin>, IResponseParams<ILoginParam>>({
      query: (body) => {
        return {
          url: `api/auth/login`,
          method: 'POST',
          data: body,
        };
      },
    }),
  }),
  overrideExisting: true,
});

// Export hooks for usage in functional components
export const { useLoginMutation } = authApi;
