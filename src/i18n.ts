export default i18n;

import { Localization } from "expo";
import i18n from "i18n-js";
import en from "./locals/en.json";
import es from "./locals/es.json";
import fr from "./locals/fr.json";
import de from "./locals/de.json";
import pl from "./locals/pl.json";
import nl from "./locals/nl_NL.json";

i18n.fallbacks = true;
i18n.translations = { fr, en, pl, es, de, nl };
i18n.locale = Localization.locale;

export default i18n;
