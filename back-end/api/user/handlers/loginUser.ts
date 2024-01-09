import dbConnect from '@/utils/dbConnect';
import User from 'back-end/model/user';
import jwt from 'jsonwebtoken';

import type { NextApiRequest, NextApiResponse } from 'next';
import { IRequestData, ResponseData } from '..';

export interface ILoginUser {
  req: NextApiRequest;
  res: NextApiResponse<ResponseData>;
}

const loginUser = async ({ res, req }: ILoginUser) => {
  const { data } = req.body as IRequestData;
  const { email, password } = data;
  dbConnect();
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(200).json({
      message: `Cannot found  email ${email}`,
      data: email,
      responseCode: '99',
      responseMessage: `Cannot found email  ${email}`,
    });
  }

  const isValidPassword = await user.comparePassword(password, user.password);

  if (!isValidPassword) {
    return res.status(200).json({
      message: `Password  errors`,
      data: null,
      responseCode: '99',
      responseMessage: `Password  errors`,
    });
  }
  //   const jwt = user.generateJWT()
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.NODE_ENV,
    {
      expiresIn: '8h',
    }
  );

  return res.status(200).json({
    message: `Login success`,
    data: { token },
    responseCode: '00',
    responseMessage: `Login success`,
  });
};

export default loginUser;
