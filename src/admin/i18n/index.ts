import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import i18nRu from "./ru";
import i18nEn from "./en";
import i18nTr from "./tr";

const i18n = createInstance({
  fallbackLng: "en",
  resources: {
    ru: {
      translation: i18nRu,
    },
    en: {
      translation: i18nEn,
    },
    tr: {
      translation: i18nTr,
    },
  },
});

i18n.use(initReactI18next).init();

export default i18n;
