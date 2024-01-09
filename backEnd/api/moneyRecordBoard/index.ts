import createApiHandler from '@/utils/create-api-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import addMoneyRecordBoard from './handlers/addMoneyRecordBoard';
import checkTokenTest from './handlers/checkTokenTest';
import deleteMoneyRecordBoard from './handlers/deleteMoneyRecordBoard';
import getMoneyRecordBoard from './handlers/getMoneyRecordBoard';
import getMoneyRecordBoardReportByMonthYear from './handlers/getMoneyRecordBoardReportByMonthYear';
import updateMoneyRecordBoard from './handlers/updateMoneyRecordBoard';

export type MoneyRecordBoardHandlers = {
  addMoneyRecordBoard: ({
    res,
    req,
  }: {
    res: NextApiRequest;
    req: NextApiResponse;
  }) => NextApiResponse<ResponseData>;
  checkTokenTest: ({
    res,
    req,
  }: {
    res: NextApiRequest;
    req: NextApiResponse;
  }) => NextApiResponse<ResponseData>;
  deleteMoneyRecordBoard: ({
    res,
    req,
  }: {
    res: NextApiRequest;
    req: NextApiResponse;
  }) => NextApiResponse<ResponseData>;
  updateMoneyRecordBoard: ({
    res,
    req,
  }: {
    res: NextApiRequest;
    req: NextApiResponse;
  }) => NextApiResponse<ResponseData>;
  getMoneyRecordBoardReportByMonthYear: ({
    res,
    req,
  }: {
    res: NextApiRequest;
    req: NextApiResponse;
  }) => NextApiResponse<ResponseData>;
};

export type ResponseData = {
  message: string;
  data: any;
  responseCode: string;
  responseMessage?: string;
};

export type IRequestData = {
  requestId: string;
  partnerId: string;
  channelId: string;
  requestTime: string;
  data: any;
};

const moneyRecordBoardAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handlers: any
) => {
  try {
    if (req.method === 'POST') {
      const isToken = await handlers.checkTokenTest({
        req,
        res,
      });
      if (isToken) {
        if (req?.body?.data.isGet) {
          await handlers.getMoneyRecordBoard({ req, res });
        } else if (req?.body?.data.isReportByMonth) {
          await handlers.getMoneyRecordBoardReportByMonthYear({ req, res });
        } else {
          await handlers.addMoneyRecordBoard({ req, res });
        }
      }
    }
    if (req.method === 'GET') {
      const isToken = await handlers.checkTokenTest({
        req,
        res,
      });
      if (isToken) {
        await handlers.getMoneyRecordBoard({ req, res });
      }
    }
    if (req.method === 'DELETE') {
      const isToken = await handlers.checkTokenTest({
        req,
        res,
      });
      if (isToken) {
        await handlers.deleteMoneyRecordBoard({ req, res });
      }
    }
    if (req.method === 'PATCH') {
      const isToken = await handlers.checkTokenTest({
        req,
        res,
      });
      if (isToken) {
        await handlers.updateMoneyRecordBoard({ req, res });
      }
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ data: null, errors: [{ message: error?.message as unknown }] });
  }
};

export const handlers = {
  addMoneyRecordBoard,
  checkTokenTest,
  getMoneyRecordBoard,
  deleteMoneyRecordBoard,
  updateMoneyRecordBoard,
  getMoneyRecordBoardReportByMonthYear,
};

export default createApiHandler(moneyRecordBoardAPI, handlers, {});
