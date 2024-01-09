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
        yearName: 'Thg 1',
        id: '01',
      },
      {
        yearName: 'Thg 2',
        id: '02',
      },
      {
        yearName: 'Thg 3',
        id: '03',
      },
      {
        yearName: 'Thg 4',
        id: '04',
      },
      {
        yearName: 'Thg 5',
        id: '05',
      },
      {
        yearName: 'Thg 6',
        id: '06',
      },
      {
        yearName: 'Thg 7',
        id: '07',
      },
      {
        yearName: 'Thg 8',
        id: '08',
      },
      {
        yearName: 'Thg 9',
        id: '09',
      },

      {
        yearName: 'Thg 10',
        id: '10',
      },
      {
        yearName: 'Thg 11',
        id: '11',
      },
      {
        yearName: 'Thg 12',
        id: '12',
      },
    ],
  });
}
