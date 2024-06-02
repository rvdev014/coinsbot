import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/lang/en.json';
import ru from '../public/lang/ru.json';

// Initialize i18n
i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        ru: {
            translation: ru
        }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;
