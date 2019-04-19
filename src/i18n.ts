export default i18n;

import { Localization } from "expo";
import i18n from "i18n-js";
import en from "./locals/en.json";
import fr from "./locals/fr.json";
import ko from "./locals/ko.json";
import es from "./locals/es.json";
import de from "./locals/de.json";
import pl from "./locals/pl.json";
import nl from "./locals/nl_NL.json";
import fi from "./locals/fi.json";
import zhCN from "./locals/zh-CN.json";

i18n.fallbacks = true;
i18n.translations = { fr, en, ko, pl, es, de, fi, nl, "zh-CN": zhCN };
i18n.locale = Localization.locale;

export default i18n;
