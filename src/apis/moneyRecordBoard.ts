import {
  IAddMoneyRecordBoardParam,
  IBoardReportByMonthYear,
  IGetMoneyRecordBoardParam,
  IReportByMonthParams,
  IResponseParams,
} from '@/types';
import { ResponseBase } from 'src/utils';
import { api } from 'src/utils/api';

const apiWithTag = api.enhanceEndpoints({
  addTagTypes: ['List'],
});

export const moneyRecordBoardApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    addMoneyRecordBoard: build.mutation<
      ResponseBase<any>,
      IResponseParams<IAddMoneyRecordBoardParam>
    >({
      query: (body) => {
        return {
          url: `api/moneyRecordBoard`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: ['List'],
    }),

    getMoneyRecordBoard: build.mutation<
      ResponseBase<any>,
      IResponseParams<IGetMoneyRecordBoardParam>
    >({
      query: ({ ...body }) => ({
        url: `api/moneyRecordBoard`,
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['List'],
    }),
    deleteMoneyRecordBoard: build.mutation<
      ResponseBase<any>,
      IResponseParams<IGetMoneyRecordBoardParam>
    >({
      query: ({ ...data }) => ({
        url: `api/moneyRecordBoard`,
        method: 'DELETE',
        params: data,
      }),
      invalidatesTags: ['List'],
    }),
    updateMoneyRecordBoard: build.mutation<
      ResponseBase<any>,
      IResponseParams<IGetMoneyRecordBoardParam>
    >({
      query: ({ ...data }) => ({
        url: `api/moneyRecordBoard`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['List'],
    }),

    getMoneyRecordBoardReportByMonth: build.mutation<
      ResponseBase<IBoardReportByMonthYear>,
      IResponseParams<IReportByMonthParams>
    >({
      query: ({ ...body }) => ({
        url: `api/getMoneyRecordBoardReportByMonthYear`,
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['List'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useAddMoneyRecordBoardMutation,
  useGetMoneyRecordBoardMutation,
  useDeleteMoneyRecordBoardMutation,
  useUpdateMoneyRecordBoardMutation,
  useGetMoneyRecordBoardReportByMonthMutation,
} = moneyRecordBoardApi;
