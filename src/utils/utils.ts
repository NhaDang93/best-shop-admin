import { IResponseParams } from '@/types';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { FORMAT_YYYY_MM_DD_HH_MM_SS } from '../constants';

export function removeAccents(str: string) {
  const AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];
  for (let i = 0; i < AccentsMap.length; i += 1) {
    const re = new RegExp(`[${AccentsMap[i].substr(1)}]`, 'g');
    const char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export const roundTotal = (total: number) => {
  const quantity = parseFloat(total.toFixed(3));
  if (quantity % 1 === 0) {
    return `${parseFloat(total.toFixed(0))?.toLocaleString('nl-BE')}`;
  }
  return `${total?.toLocaleString('nl-BE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const responseParams = (data: any) => {
  const params: IResponseParams<any> = {
    requestId: uuidv4() as string,
    partnerId: 'BEST_SHOP',
    channelId: 'BEST',
    requestTime: dayjs(new Date()).format(FORMAT_YYYY_MM_DD_HH_MM_SS) ?? '',
    data,
  };
  return params;
};
