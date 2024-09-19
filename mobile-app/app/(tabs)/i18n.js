// // i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import * as Localization from 'react-native-localize';

// import en from '../../transalations/en.json';
// import hi from '../../transalations/hi.json';
// import mr from '../../transalations/mr.json';

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: (callback) => {
//     const locales = Localization.getLocales();
//     callback(locales[0].languageTag);
//   },
//   init: () => {},
//   cacheUserLanguage: () => {}
// };

// i18n
//   .use(languageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en', // Default language
//     lng: Localization.getLocales()[0].languageTag, // Get device language
//     resources: {
//       en: { translation: en },
//       hi: { translation: hi },
//       mr: { translation: mr },
//     },
//     interpolation: {
//       escapeValue: false, // React already handles this
//     },
//   });

// export default i18n;


// // import i18n from 'i18next';
// // import { initReactI18next } from 'react-i18next';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import * as RNLocalize from 'react-native-localize';

// // import en from '@/transalations/en.json';
// // import hi from '@/transalations/hi.json';
// // import mr from '@/transalations/mr.json';

// // const LANGUAGES = {
// //   en,
// //   hi,
// //   mr
// // };

// // const LANG_CODES = Object.keys(LANGUAGES);

// // const LANGUAGE_DETECTOR = {
// //   type: 'languageDetector',
// //   async: true,
// //   detect: callback => {
// //     AsyncStorage.getItem('user-language', (err, language) => {
// //       // if error fetching stored data or no language was stored
// //       // fall back to device settings
// //       if (err || !language) {
// //         const bestLng = RNLocalize.findBestAvailableLanguage(LANG_CODES);
// //         callback(bestLng.languageTag || 'en');
// //         return;
// //       }
// //       callback(language);
// //     });
// //   },
// //   init: () => {},
// //   cacheUserLanguage: language => {
// //     AsyncStorage.setItem('user-language', language);
// //   }
// // };

// // i18n
// //   .use(LANGUAGE_DETECTOR)
// //   .use(initReactI18next)
// //   .init({
// //     resources: LANGUAGES,
// //     react: {
// //       useSuspense: false
// //     },
// //     interpolation: {
// //       escapeValue: false
// //     },
// //     defaultNS: 'common'
// //   });

// // export default i18n;