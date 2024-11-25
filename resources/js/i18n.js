import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from './locales/en/translation.json';
import translationsPl from './locales/pl/translation.json';

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationsEn },
            pl: { translation: translationsPl },
        },
        lng: localStorage.getItem('selectedLanguage') || 'pl', // Default to 'en'
        fallbackLng: 'pl',
        interpolation: { escapeValue: false },
    });

export default i18next;
