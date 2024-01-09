import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '..';
import User from '../../../model/user';

export interface ICheckToken {
  req: NextApiRequest;
  res: NextApiResponse<ResponseData>;
}

const checkTokenTest = async ({ res, req }: ICheckToken) => {
  const userCookies = req?.headers.authorization?.replace('Bearer ', '') ?? '';
  dbConnect();
  const decode = jwt.verify(userCookies, process.env.NODE_ENV) as {
    id: string;
  };

  const user = await User.findById(decode?.id ?? '');
  if (!user) {
    return false;
  }
  if (user) {
    return true;
  }
  return false;
};

export default checkTokenTest;
