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

export enum PriceTypeEnum {
  House_Fee = '1',
  Sales_Money = '2',
  Import_Money = '3',
  Spending_Money = '4',
  Exchange_Cash = '5',
  House_Money = '6',
}

const getMoneyRecordBoardReportByMonthYear = async ({
  res,
  req,
}: IMoneyRecordBoard) => {
  const { data } = req.body;
  const { year, month } = data;
  await dbConnect();
  let result;
  try {
    const userCookies =
      req?.headers.authorization?.replace('Bearer ', '') ?? '';
    const decode = jwt.verify(userCookies, process.env.NODE_ENV) as {
      id: string;
    };

    const user = await User.findById(decode?.id ?? '');
    let moneyRecordBoardMonthHouseFee = await MoneyRecordBoard.findOne({
      [`price.date`]: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${year}-${month}-${getLastDayOfMonth(
            parseFloat(`${year}`),
            parseFloat(`${month}`) - 1
          )}`
        ),
      },
      [`price.priceType`]: PriceTypeEnum.House_Fee,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    let moneyRecordBoardMonthExchangeCash = await MoneyRecordBoard.findOne({
      [`price.date`]: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${year}-${month}-${getLastDayOfMonth(
            parseFloat(`${year}`),
            parseFloat(`${month}`) - 1
          )}`
        ),
      },
      [`price.priceType`]: PriceTypeEnum.Exchange_Cash,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    let moneyRecordBoardMonthImportMoney = await MoneyRecordBoard.find({
      [`price.date`]: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${year}-${month}-${getLastDayOfMonth(
            parseFloat(`${year}`),
            parseFloat(`${month}`) - 1
          )}`
        ),
      },
      [`price.priceType`]: PriceTypeEnum.Import_Money,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    let moneyRecordBoardMonthSpendingMoney = await MoneyRecordBoard.findOne({
      [`price.date`]: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${year}-${month}-${getLastDayOfMonth(
            parseFloat(`${year}`),
            parseFloat(`${month}`) - 1
          )}`
        ),
      },
      [`price.priceType`]: PriceTypeEnum.Spending_Money,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    let moneyRecordBoardMonthSalesMoney = await MoneyRecordBoard.find({
      [`price.date`]: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${year}-${month}-${getLastDayOfMonth(
            parseFloat(`${year}`),
            parseFloat(`${month}`) - 1
          )}`
        ),
      },
      [`price.priceType`]: PriceTypeEnum.Sales_Money,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    let moneyRecordBoardMonthHouseMoney = await MoneyRecordBoard.findOne({
      [`price.date`]: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${year}-${month}-${getLastDayOfMonth(
            parseFloat(`${year}`),
            parseFloat(`${month}`) - 1
          )}`
        ),
      },
      [`price.priceType`]: PriceTypeEnum.House_Money,
      createUser: user?.email,

      isDelete: false,
    }).sort({ [`price.date`]: -1 });

    if (!moneyRecordBoardMonthImportMoney) {
      moneyRecordBoardMonthImportMoney = [
        {
          priceATM: 0,
          priceCash: 0,
          priceSellOnline: 0,
        },
      ];
    }

    if (!moneyRecordBoardMonthExchangeCash) {
      moneyRecordBoardMonthExchangeCash = {
        priceATM: 0,
        priceCash: 0,
        priceSellOnline: 0,
      };
    }
    if (!moneyRecordBoardMonthHouseFee) {
      moneyRecordBoardMonthHouseFee = {
        priceATM: 0,
        priceCash: 0,
        priceSellOnline: 0,
      };
    }
    if (!moneyRecordBoardMonthSalesMoney.length) {
      moneyRecordBoardMonthSalesMoney = [
        {
          priceATM: 0,
          priceCash: 0,
          priceSellOnline: 0,
        },
      ];
    }

    if (!moneyRecordBoardMonthSpendingMoney) {
      moneyRecordBoardMonthSpendingMoney = {
        priceATM: 0,
        priceCash: 0,
        priceSellOnline: 0,
      };
    }
    if (!moneyRecordBoardMonthHouseMoney) {
      moneyRecordBoardMonthHouseMoney = {
        priceATM: 0,
        priceCash: 0,
        priceSellOnline: 0,
      };
    }
    result = {
      moneyRecordBoardMonthSpendingMoney: {
        priceATM: moneyRecordBoardMonthSpendingMoney?.priceATM,
        priceCash: moneyRecordBoardMonthSpendingMoney?.priceCash,
        priceSellOnline: moneyRecordBoardMonthSpendingMoney?.priceSellOnline,
      },
      moneyRecordBoardMonthHouseFee: {
        priceATM: moneyRecordBoardMonthHouseFee?.priceATM,
        priceCash: moneyRecordBoardMonthHouseFee?.priceCash,
        priceSellOnline: moneyRecordBoardMonthHouseFee?.priceSellOnline ?? 0,
      },
      moneyRecordBoardMonthImportMoney: {
        priceATM: moneyRecordBoardMonthImportMoney.reduce(
          (acc, currentValue) => acc + currentValue.priceATM,
          0
        ),
        priceCash: moneyRecordBoardMonthImportMoney.reduce(
          (acc, currentValue) => acc + currentValue.priceCash,
          0
        ),
        priceSellOnline: moneyRecordBoardMonthImportMoney.reduce(
          (acc, currentValue) => acc + currentValue.priceSellOnline,
          0
        ),
      },
      moneyRecordBoardMonthExchangeCash: {
        priceATM: moneyRecordBoardMonthExchangeCash?.priceATM,
        priceCash: moneyRecordBoardMonthExchangeCash?.priceCash,
        priceSellOnline:
          moneyRecordBoardMonthExchangeCash?.priceSellOnline ?? 0,
      },
      moneyRecordBoardMonthSalesMoney: {
        priceATM: moneyRecordBoardMonthSalesMoney.reduce(
          (acc, currentValue) => acc + currentValue.priceATM,
          0
        ),
        priceCash: moneyRecordBoardMonthSalesMoney.reduce(
          (acc, currentValue) => acc + currentValue.priceCash,
          0
        ),
        priceSellOnline: moneyRecordBoardMonthSalesMoney.reduce(
          (acc, currentValue) => acc + currentValue.priceSellOnline,
          0
        ),
      },
      moneyRecordBoardMonthHouseMoney: {
        priceATM: moneyRecordBoardMonthHouseMoney?.priceATM,
        priceCash: moneyRecordBoardMonthHouseMoney?.priceCash,
        priceSellOnline: moneyRecordBoardMonthHouseMoney?.priceSellOnline ?? 0,
      },
      date: `${year}-${month}-${getLastDayOfMonth(
        parseFloat(`${year}`),
        parseFloat(`${month}`) - 1
      )}`,
    };
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

export default getMoneyRecordBoardReportByMonthYear;
