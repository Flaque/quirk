import { Localization } from 'expo';
import i18n from 'i18n-js';
import en from './locals/en.json'
import fr from './locals/fr.json'
import nl from './locals/nl_NL.json'

i18n.fallbacks = true;
i18n.translations = { fr, en, nl };
i18n.locale = Localization.locale;

export default i18n;