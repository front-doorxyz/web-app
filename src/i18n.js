import i18next from 'i18next';
import en from "./translations/en";

i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: en
      }
    }
  });