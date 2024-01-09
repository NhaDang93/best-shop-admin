import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '..';
import User from '../../../model/user';

export interface ICheckToken {
  req: NextApiRequest;
  res: NextApiResponse<ResponseData>;
}

const getInfoUser = async ({ res, req }: ICheckToken) => {
  const userCookies = req?.headers.authorization?.replace('Bearer ', '') ?? '';
  const decode = jwt.verify(userCookies, process.env.NODE_ENV) as {
    id: string;
  };
  const user = await User.findById(decode?.id ?? '');
  if (!user) {
    res.status(500).json({
      message: `Token errors`,
      data: null,
      responseCode: '99',
      responseMessage: `Token errors`,
    });
  } else if (user) {
    return res.status(200).json({
      message: `get user success`,
      data: user,
      responseCode: '00',
      responseMessage: `get user success`,
    });
  } else {
    res.status(500).json({
      message: `Token errors`,
      data: null,
      responseCode: '99',
      responseMessage: `Token errors`,
    });
  }
};
export default getInfoUser;
