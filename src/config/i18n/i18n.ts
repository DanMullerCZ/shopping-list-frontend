import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import csTranslations from './locales/cs/translation.json';
import enTranslations from './locales/en/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        cs: { translation: csTranslations },
        en: { translation: enTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
