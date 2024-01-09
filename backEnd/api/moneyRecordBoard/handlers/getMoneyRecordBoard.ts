import { getLastDayOfMonth } from '@/utils';
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

const getMoneyRecordBoard = async ({ res, req }: IMoneyRecordBoard) => {
  const { data } = req.body;
  const { date, priceType, dateMonth } = data;
  await dbConnect();
  let result;
  try {
    const userCookies =
      req?.headers.authorization?.replace('Bearer ', '') ?? '';
    const decode = jwt.verify(userCookies, process.env.NODE_ENV) as {
      id: string;
    };

    const user = await User.findById(decode?.id ?? '');
    let gte = new Date(`${date}-01-01`);
    let lt = new Date(`${date}-${12}-${getLastDayOfMonth(date, 11)}`);
    if (dateMonth) {
      gte = new Date(`${date}-${dateMonth}-01`);
      lt = new Date(`${date}-${dateMonth}-31`);
    }
    const moneyRecordBoard = await MoneyRecordBoard.find({
      [`price.date`]: {
        $gte: gte,
        $lt: lt,
      },
      [`price.priceType`]: priceType,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    if (!moneyRecordBoard?.length) {
      return res.status(200).json({
        data: null,
        responseCode: '99',
        responseMessage: `Data is empty`,
        message: `Data is empty`,
      });
    }
    result = moneyRecordBoard;
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
    responseMessage: 'Get moneyRecordBoard success',
    message: 'get moneyRecordBoard success',
  });
};

export default getMoneyRecordBoard;
