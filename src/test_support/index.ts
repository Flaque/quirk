export function getKeysOnly (object) {
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
