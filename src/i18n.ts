import { Localization } from 'expo';
import i18n from 'i18n-js';
import en from './locals/en.json'
import es from './locals/es.json'
import fr from './locals/fr.json'
import pl from './locals/pl.json'

i18n.fallbacks = true;
i18n.translations = { fr, en, pl, es };
i18n.locale = Localization.locale;

export default i18n;
