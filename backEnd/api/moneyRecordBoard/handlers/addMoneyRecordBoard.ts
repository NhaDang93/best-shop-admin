import dbConnect from '@/utils/dbConnect';
import MoneyRecordBoard from 'backEnd/model/moneyRecordBoard';
import User from 'backEnd/model/user';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '..';

export interface IMoneyRecordBoard {
  req: NextApiRequest;
  res: NextApiResponse<ResponseData>;
}

const addMoneyRecordBoard = async ({ res, req }: IMoneyRecordBoard) => {
  const { data } = req.body;
  const { date, priceCash, priceATM, priceSellOnline, priceType, note } = data;
  await dbConnect();
  let result;
  try {
    const userCookies =
      req?.headers.authorization?.replace('Bearer ', '') ?? '';
    const decode = jwt.verify(userCookies, process.env.NODE_ENV) as {
      id: string;
    };

    const user = await User.findById(decode?.id ?? '');

    const moneyRecordBoard = await MoneyRecordBoard.findOne({
      date,
    });
    if (moneyRecordBoard) {
      return res.status(200).json({
        data: null,
        responseCode: '99',
        responseMessage: `Date already exists :  ${date}`,
        message: `Date already exists :  ${date}`,
      });
    }
    result = await MoneyRecordBoard.create({
      _id: new mongoose.Types.ObjectId(),
      priceCash,
      priceATM,
      note,
      priceSellOnline,
      createUser: user?.email,
      price: {
        priceType,
        date: new Date(date),
      },
    });
    await result.save();
  } catch (error: any) {
    return res.status(200).json({
      data: null,
      responseCode: '99',
      responseMessage: error?.message ?? '',
      message: 'Errors money record board',
    });
  }
  return res.status(200).json({
    data: result,
    responseCode: '00',
    responseMessage: 'Create money record board success',
    message: 'Create money record board success',
  });
};

export default addMoneyRecordBoard;
