export enum PriceTypeEnum {
  House_Fee = '1',
  Sales_Money = '2',
  Import_Money = '3',
  Spending_Money = '4',
  Exchange_Cash = '5',
  House_Money = '6',
}

export interface IAddMoneyRecordBoardParam {
  priceType: PriceTypeEnum;
  priceCash: number;
  priceATM: number;
  priceSellOnline: number;
  date: string;
}

export interface IGetMoneyRecordBoardParam {
  priceType?: PriceTypeEnum;
  date?: string;
  isGet?: boolean;
  _id?: string;
}

export interface IReportByMonthParams {
  year: string;
  month: string;
  isReportByMonth: boolean;
}

export interface IBoardReportByMonthYear {
  moneyRecordBoardMonthImportMoney: {
    priceATM: number;
    priceCash: number;
    priceSellOnline: number;
  };
  moneyRecordBoardMonthHouseFee: {
    priceATM: number;
    priceCash: number;
    priceSellOnline: number;
  };
  moneyRecordBoardMonthSpendingMoney: {
    priceATM: number;
    priceCash: number;
    priceSellOnline: number;
  };
  moneyRecordBoardMonthExchangeCash: {
    priceATM: number;
    priceCash: number;
    priceSellOnline: number;
  };
  moneyRecordBoardMonthSalesMoney: {
    priceATM: number;
    priceCash: number;
    priceSellOnline: number;
  };
  moneyRecordBoardMonthHouseMoney: {
    priceATM: number;
    priceCash: number;
    priceSellOnline: number;
  };
}
