import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data: any;
  responseCode: string;
  responseMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  return res.status(200).json({
    message: 'Success',
    responseCode: '00',
    data: [
      {
        yearName: '2020',
        id: '0',
      },
      {
        yearName: '2021',
        id: '1',
      },
      {
        yearName: '2022',
        id: '2',
      },
      {
        yearName: '2023',
        id: '3',
      },
      {
        yearName: '2024',
        id: '4',
      },
    ],
  });
}
