import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en-US';
import ko from './ko-KR';
import vi from './vi-VN';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en_US',
    fallbackLng: 'en_US',
    fallbackNS: '',
    resources: {
      en_US: en,
      vi_VN: vi,
      ko_KR: ko,
    },
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then();

export default i18n;
