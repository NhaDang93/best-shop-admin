export interface ILink {
  url: string;
  icon?: any;
  label?: string;
}

export interface IProduct {
  name?: string;
  code?: string;
  price?: string;
  createAt?: string;
  src?: string;
  description?: string;
  id?: string;
  no?: any;
}

export interface IYearItem {
  yearName: string;
  id: string;
}

export type IMonthItem = IYearItem;
export interface IStatusContact {
  statusContactTelesaleList: IYearItem[];
}

export interface IResponseParams<T = any> {
  requestId: string;
  partnerId: string;
  channelId: string;
  requestTime: string;
  data: T;
}

export interface IHouseFee {
  id: string;
  priceCash: string;
  priceATM: string;
  priceSellOnline: string;
  price?: { date: string };
  _id?: string;
  note: string | '';
}

export interface IReport {
  id: string;
  priceCash: string;
  priceATM: string;
  priceSellOnline: string;
}

export type ISalesMoney = IHouseFee;
export type IImportMoney = IHouseFee;
export type ISpendingMoney = IHouseFee;
export type IExchangeCash = IHouseFee;
export type IHouseMoney = IHouseFee;
