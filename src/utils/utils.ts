import accounting from 'accounting';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { FORMAT_YYYY_MM_DD_HH_MM_SS } from '../constants';
import { IResponseParams } from '../types';
import { LanguageEnum } from './locale';

export const DEFAULT_CURRENCY_UNIT = {
  full: 'VNĐ',
  short: '₫',
  short2: 'đ',
};

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
    partnerId: 'SALE_PORTAL',
    channelId: 'PORTAL',
    requestTime: dayjs(new Date()).format(FORMAT_YYYY_MM_DD_HH_MM_SS) ?? '',
    data,
  };
  return params;
};

export const filterItemStatusContract = (
  data:
    | {
        label: string;
        id: string;
        name: string;
      }[]
    | undefined,
  id: string
) => {
  return (
    data?.find((_item) => {
      return _item?.id === id || _item?.name === id;
    }) || null
  );
};

export const backgroundStatusContract = (statusContact: string) => {
  let backgroundColorStatus = '#EAEEF2';
  if (statusContact === ('Chưa liên hệ' || 'Khác')) {
    backgroundColorStatus = '#EAEEF2';
  } else if (
    statusContact === 'Bận lần 1' ||
    statusContact === 'Bận lần 2' ||
    statusContact === 'Bận lần 2' ||
    statusContact === 'Suy nghĩ thêm' ||
    statusContact === ' Không nghe máy lần 3'
  ) {
    backgroundColorStatus = '#FFECB3';
  } else if (
    statusContact === 'Sai SDT' ||
    statusContact === 'Không liên lạc được' ||
    statusContact === 'Từ chối' ||
    statusContact === 'Sai số'
  ) {
    backgroundColorStatus = '#FCA5A6';
  } else if (statusContact === 'Đồng ý') {
    backgroundColorStatus = '#D5E5B4';
  }
  return backgroundColorStatus;
};

export function getLastDayOfMonth(year: number, month: number) {
  // Create a new Date object for the next month's first day
  const nextMonth: any = new Date(year, month + 1, 1);

  // Subtract one day to get the last day of the current month
  const lastDay = new Date(nextMonth - 1);

  // Return the date of the last day
  return lastDay.getDate();
}
export const replaceAll = (source = '', textReplace = '', textInstead = '') => {
  return source.split(textReplace).join(textInstead);
};
export const formatNumber = (
  value: string | number,
  symbol = '',
  lang = LanguageEnum.vi_VN,
  precision = 0
) => {
  const money = replaceAll(value?.toString(), ',', '');
  if (money.substring(0, money.length - 1) === ',') {
    return money;
  }
  const precisionCount =
    parseFloat(money)?.toString().split('.')[1]?.length < precision + 1
      ? parseFloat(money)?.toString().split('.')[1]?.length
      : 0;
  if (parseInt(<string>money, 10) !== parseFloat(<string>money)) {
    return accounting.formatMoney(money, {
      symbol,
      thousand: ',',
      decimal: '.',
      format:
        lang === LanguageEnum.en_US && symbol === DEFAULT_CURRENCY_UNIT.full
          ? '%s %v'
          : (symbol && '%v %s') || '%v',
      precision:
        money?.includes('.') && Number(money.split('.')[1]) > 0
          ? (precisionCount > precision && precisionCount) || precision
          : 0,
    });
  }
  return accounting.formatMoney(money, {
    symbol,
    thousand: ',',
    decimal: '.',
    format:
      lang === LanguageEnum.en_US && symbol === DEFAULT_CURRENCY_UNIT.full
        ? '%s %v'
        : (symbol && '%v %s') || '%v',
    precision:
      money?.includes('.') && Number(money.split('.')[1]) > 0
        ? (precisionCount > precision && precisionCount) || precision
        : 0,
  });
};
