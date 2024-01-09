import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data: any;
  responseCode: string;
  responseMessage?: string;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_URL_API ??
  'http://113.161.76.226:8087/hdb-sale-portal/';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let resp: any = {};
  try {
    resp = await axios.post(`${BASE_URL}api/getListCustomer`, {
      ...req?.body,
    });
  } catch (e: any) {
    return res.status(400).json({
      responseCode: resp?.responseCode,
      message: resp?.message,
      data: req.body,
    });
  }
  return res.status(200).json({
    message: resp?.message,
    responseCode: resp.responseCode,
    data: resp.data,
  });
}
