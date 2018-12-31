import { validThought } from "./sanitize";

// Creates a Thought
const t = (
  automaticThought,
  alternativeThought,
  cognitiveDistortions,
  challenge
) => {
  return {
    automaticThought,
    alternativeThought,
    cognitiveDistortions,
    challenge,
  };
};

// Creates a fixture
const fix = (output, input) => {
  return {
    output,
    input,
  };
};

// Tests `fn` against a bunch of fixtures like {input, output}
function testAgainstFixtures(fn, fixtures) {
  for (const f of fixtures) {
    if (fn(f.input) !== f.output) {
      console.error(
        `for '${JSON.stringify(f.input)}', got '${fn(f.input)}', expected '${
          f.output
        }'`
      );
    }

    expect(fn(f.input)).toEqual(f.output);
  }
}

const stdBadData = [
  fix(false, {}),
  fix(false, undefined),
  fix(false, null),
  fix(false, false),
  fix(false, true),
  fix(false, "true"),
  fix(false, "false"),
  fix(false, NaN),
];

test("validThought works against stdBadData fixtures", () => {
  testAgainstFixtures(validThought, stdBadData);
});

const partiallyCompleteThoughts = [
  // partially complete
  fix(false, { automaticThought: "" }),
  fix(false, { alternativeThought: "" }),
  fix(false, { cognitiveDistortions: [] }),
  fix(false, { challenge: "" }),
  fix(false, { cognitiveDistortions: "" }),
];

test("validThought works against partiallyCompleteThoughts fixtures", () => {
  testAgainstFixtures(validThought, partiallyCompleteThoughts);
});

const happyPath = [
  fix(true, t("", "", [], "")),
  fix(true, t("oh", "ya", [], "data")),
];

test("validThoughts works against happyPath fixtures", () => {
  testAgainstFixtures(validThought, happyPath);
});
