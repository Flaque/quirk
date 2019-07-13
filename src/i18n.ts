import * as Localization from 'expo-localization';
import i18n from "i18n-js";
import en from "./locals/en.json";
import it from "./locals/it.json";
import fr from "./locals/fr.json";
import ko from "./locals/ko.json";
import es from "./locals/es.json";
import de from "./locals/de.json";
import pl from "./locals/pl.json";
import nl from "./locals/nl_NL.json";
import fi from "./locals/fi.json";
import ru from "./locals/ru.json";
import zhHans from "./locals/zh-Hans.json";
import ptPT from "./locals/pt-pt.json";
import ptBR from "./locals/pt-br.json";
import nb from "./locals/nb.json";
import sv from "./locals/sv.json";
import ro from "./locals/ro.json";

i18n.fallbacks = true;
i18n.translations = {
  fr,
  en,
  it,
  ko,
  pl,
  es,
  de,
  fi,
  nl,
  ru,
  "zh-Hans": zhHans,
  "pt-PT": ptPT,
  "pt-BR": ptBR,
  nb,
  sv,
  ro,
};
i18n.locale = Localization.locale;

export default i18n;
