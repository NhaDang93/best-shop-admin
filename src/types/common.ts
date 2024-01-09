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

export interface IResponseParams<T = any> {
  requestId: string;
  partnerId: string;
  channelId: string;
  requestTime: string;
  data: T;
}
