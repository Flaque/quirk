import { Localization } from 'expo';
import i18n from 'i18n-js';
import en from './locals/en.json'
import fr from './locals/fr.json'

console.log('Localization', Localization)
console.log('i18n', i18n)

i18n.fallbacks = true;
i18n.translations = { fr, en };
i18n.locale = Localization.locale;

export default i18n;