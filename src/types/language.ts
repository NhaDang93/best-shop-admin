import { LanguageEnum } from 'src/utils';

export interface ILocale {
  key: LanguageEnum;
  label: string;
  value: LanguageEnum;
  img: string;
}
