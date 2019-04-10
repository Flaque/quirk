import { getKeysOnly } from './test_support'

import en from './locals/en.json';
import es from './locals/es.json';
import de from './locals/de.json';
import pl from './locals/pl.json';

test("Spanish localization keys match English localization keys", () => {
  expect(getKeysOnly(es)).toEqual(getKeysOnly(en));
});

test("German localization keys match English localization keys", () => {
  expect(getKeysOnly(de)).toEqual(getKeysOnly(en));
});

test("Polish localization keys match English localization keys", () => {
  expect(getKeysOnly(pl)).toEqual(getKeysOnly(en));
});

