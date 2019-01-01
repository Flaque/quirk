import {
  validThought,
  maybeRepairThought,
  validThoughtGroup,
} from "./sanitize";
import { newThought, SavedThought, Thought, ThoughtGroup } from "./thoughts";

// Creates a Thought
const t = (
  automaticThought,
  alternativeThought,
  cognitiveDistortions,
  challenge
): Thought => {
  return {
    automaticThought,
    alternativeThought,
    cognitiveDistortions,
    challenge,
  };
};

const save = (
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
    uuid: "AHHHHHHHHHH",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const g = (date: string, thoughts: SavedThought[]): ThoughtGroup => {
  return {
    date,
    thoughts,
  };
};

const dateStr = () => new Date().toDateString();

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

test("validThoughtGroup works against stdBadData fixtures", () => {
  testAgainstFixtures(validThoughtGroup, stdBadData);
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

const happyThoughts = [
  fix(true, t("", "", [], "")),
  fix(true, t("oh", "ya", [], "data")),
];

test("validThoughts works against happyThoughts fixtures", () => {
  testAgainstFixtures(validThought, happyThoughts);
});

test("validThoughts works with saved thoughts", () => {
  const saved: SavedThought = {
    uuid: "ahhhhhhhhhhhhhh",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...newThought(),
  };
  expect(validThought(saved)).toBe(true);
});

const happyThoughtGroups = [
  fix(true, g(dateStr(), [save("a", "b", [{}], "c")])),
  fix(
    true,
    g(dateStr(), [save("a", "b", [], "c"), save("oh", "ya", [], "data")])
  ),
];

test("validThoughtGroup works against happyThoughtGroups fixtures", () => {
  testAgainstFixtures(validThoughtGroup, happyThoughtGroups);
});

test("validThoughtGroup works against single item", () => {
  const thought = newThought();
  const savedThought: SavedThought = {
    uuid: "aaghhhhh",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...thought,
  };

  const group: ThoughtGroup = {
    date: new Date().toDateString(),
    thoughts: [savedThought],
  };

  expect(validThoughtGroup(group)).toBe(true);
});

const badThoughtGroups = [
  fix(false, g(null, [save("", "", [], "")])),
  fix(false, g(dateStr(), [])),
  fix(false, g(dateStr(), [undefined, null])),
  fix(false, g(dateStr(), [{} as SavedThought])),
];

test("validThoughtGroup works against badThoughtGroups fixtures", () => {
  testAgainstFixtures(validThoughtGroup, badThoughtGroups);
});

test("maybeRepairThought can actually repair a thought", () => {
  expect(maybeRepairThought(null)).toEqual(newThought());
  expect(maybeRepairThought(undefined)).toEqual(newThought());
  expect(maybeRepairThought({})).toEqual(newThought());
});

test("maybeRepairThought doesnt overwrite a good thought", () => {
  const goodThought = newThought();
  goodThought.automaticThought = "woah no";
  goodThought.alternativeThought = "oh ya";
  goodThought.challenge = "what if yes";

  expect(maybeRepairThought(goodThought)).toEqual(goodThought);
});

test("repairThought doesn't overwrite existing content", () => {
  const repaired = maybeRepairThought({
    automaticThought: "intellectual spooktitude",
  });
  expect(repaired.automaticThought).toEqual("intellectual spooktitude");
});
