import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const reqData = {
    ...req.body,
  };
  await axios
    .post('', {
      ...reqData,
    })
    .then(function (response) {
      res.status(200).json({ code: '00', data: response?.data });
    })
    .catch(function (error) {
      res.status(200).json({
        code: '99',
        message:
          'Hệ thống gián đoạn. Vui lòng thử lại sau ít phút. Xin cảm ơn quý khách',
      });
    });
}
