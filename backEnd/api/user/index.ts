import createApiHandler from '@/utils/create-api-handler';
import dbConnect from '@/utils/dbConnect';
import User from 'backEnd/model/user';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import getInfoUser from './handlers/getInfoUser';

import loginUser, { ILoginUser } from './handlers/loginUser';

export type CustomerHandlers = {
  loginUser: ({ res, req }: ILoginUser) => NextApiResponse<ResponseData>;
  getInfoUser: ({ res, req }: ILoginUser) => NextApiResponse<ResponseData>;
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
  requestTime: '2023-12-24 14:46:00';
  data: any;
};

const loginAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handlers: any
) => {
  try {
    if (req.method === 'POST') {
      if (req.body?.data?.check_token) {
        const userCookies =
          req?.headers.authorization?.replace('Bearer ', '') ?? '';
        dbConnect();
        const decode = jwt.verify(userCookies, process.env.NODE_ENV) as {
          id: string;
        };
        const user = await User.findById(decode?.id ?? '');
        if (user) {
          await handlers.getInfoUser({ req, res });
        } else {
          res.status(500).json({
            message: `Token errors`,
            data: null,
            responseCode: '99',
            responseMessage: `Token errors`,
          });
        }
      }

      return await handlers.loginUser({ req, res });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ data: null, errors: [{ message: error?.message as unknown }] });
  }
};

export const handlers = {
  loginUser,
  getInfoUser,
};

export default createApiHandler(loginAPI, handlers, {});
