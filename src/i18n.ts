import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ml from "./locales/ml.json";

// Get saved language preference or default to Malayalam
const savedLanguage = localStorage.getItem('preferred-language') || 'ml';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ml: { translation: ml },
    },
    lng: savedLanguage, // use saved language or default to Malayalam
    fallbackLng: "ml", // fallback to Malayalam instead of English
    interpolation: { escapeValue: false },
  });

export default i18n;