export enum LanguageEnum {
  vi_VN = 'vi_VN',
  en_US = 'en_US',
  ko_KR = 'ko_KR',
}

export enum LocaleEnum {
  Vi = 'vi',
  Ko = 'ko',
  En = 'en',
}

export const adapterLocaleByLang = (language: LanguageEnum) => {
  switch (language) {
    case LanguageEnum.vi_VN:
      return LocaleEnum.En;
    case LanguageEnum.ko_KR:
      return LocaleEnum.Ko;
    default:
      return LocaleEnum.En;
  }
};

export const dayOfWeekFormatter = (day: string, language: LanguageEnum) =>
  language === LanguageEnum.vi_VN ? day : day.substring(0, 1);
