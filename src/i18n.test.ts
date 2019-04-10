import en from './locals/en.json';
import es from './locals/es.json';
import de from './locals/de.json';
import pl from './locals/pl.json';

function getKeysOnly (object) {
  return Object.keys(object).reduce(
    (memo, key) => {
      if (typeof(object[key]) == 'string') {
        memo[key] = '';
      } else {
        memo[key] = getKeysOnly(object[key]);
      };

      return memo;
    },
    {}
  );
};

test("Spanish localization keys match English localization keys", () => {
  expect(getKeysOnly(es)).toEqual(getKeysOnly(en));
});

test("German localization keys match English localization keys", () => {
  expect(getKeysOnly(de)).toEqual(getKeysOnly(en));
});

test("Polish localization keys match English localization keys", () => {
  expect(getKeysOnly(pl)).toEqual(getKeysOnly(en));
});

