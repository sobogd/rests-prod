import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nRu from './ru';
import i18nTr from './tr';

import enJson from './en.json';

const i18n = createInstance({
  fallbackLng: 'en',
  resources: {
    ru: {
      translation: i18nRu,
    },
    en: {
      translation: enJson,
    },
    tr: {
      translation: i18nTr,
    },
  },
});

i18n.use(initReactI18next).init();

export default i18n;
