import dbConnect from '@/utils/dbConnect';
import MoneyRecordBoard from 'backEnd/model/moneyRecordBoard';
import User from 'backEnd/model/user';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '..';

export interface IMoneyRecordBoard {
  req: NextApiRequest;
  res: NextApiResponse<ResponseData>;
}

const updateMoneyRecordBoard = async ({ res, req }: IMoneyRecordBoard) => {
  const { data } = req.body;
  const { date, priceCash, priceATM, priceSellOnline, _id, note } = data;

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
      [`_id`]: _id,
    });
    result = moneyRecordBoard;
    if (user?.email !== moneyRecordBoard?.createUser) {
      return res.status(200).json({
        data: {
          email: user?.email,
          createUser: moneyRecordBoard,
        },
        responseCode: '99',
        responseMessage: `User do'nt have permission :  ${user?.email}`,
        message: `User do'nt have permission :  ${user?.email}`,
      });
    }
    if (!moneyRecordBoard) {
      return res.status(200).json({
        data: null,
        responseCode: '99',
        responseMessage: `Date already not exists :  ${date}`,
        message: `Date already not exists :  ${date}`,
      });
    }
    const filter = { _id: moneyRecordBoard._id };
    const update = {
      $set: {
        priceCash,
        priceATM,
        priceSellOnline,
        createUser: user?.email,
        note: note || (moneyRecordBoard?.note ?? ''),
      },
    };

    await MoneyRecordBoard.updateOne(filter, update);
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
    responseMessage: 'Update money record board success',
    message: 'Update money record board success',
  });
};

export default updateMoneyRecordBoard;