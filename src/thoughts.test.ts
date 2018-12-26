import { groupThoughtsByDay, newThought, SavedThought } from "./thoughts";

function newSavedThought(date: string): SavedThought {
  return {
    uuid: "foo",
    createdAt: new Date(date),
    updatedAt: new Date(date),
    ...newThought(),
  };
}

test("groupThoughtsByDay when given an empty array, returns an empty array", () => {
  const groups = groupThoughtsByDay([]);
  expect(groups.length).toBe(0);
});

test("groupThoughtsByDay returns at least one thought", () => {
  const groups = groupThoughtsByDay([newSavedThought("Dec 24, 2018")]);
  expect(groups.length).toBe(1);
});

test("groupThoughtsByDay puts different days thoughts in different places", () => {
  const mondayThought = newSavedThought("Dec 24, 2018");
  const tuesdayThought = newSavedThought("Dec 25, 2018"); // 🎄 is a tuesday this year

  const groups = groupThoughtsByDay([mondayThought, tuesdayThought]);

  expect(groups.length).toBe(2);
  expect(groups[1].thoughts[0]).toBe(mondayThought);
  expect(groups[0].thoughts[0]).toBe(tuesdayThought);
});

test("groupThoughtsByDay puts multiple thoughts in one day", () => {
  const groups = groupThoughtsByDay([
    // Christmas ones
    newSavedThought("Dec 25, 2018"),
    newSavedThought("Dec 25, 2018"),
    newSavedThought("Dec 25, 2018"),

    // New Years
    newSavedThought("Jan 1, 2019"),
  ]);

  expect(groups.length).toBe(2);

  // Christmas
  expect(groups[1].date).toEqual(new Date("Dec 25, 2018").toDateString());
  expect(groups[1].thoughts.length).toBe(3);

  // New Years
  expect(groups[0].date).toEqual(new Date("Jan 1, 2019").toDateString());
  expect(groups[0].thoughts.length).toBe(1);
});

test("groupThoughtsByDay doesn't copy thoughts", () => {
  const firstThought = newSavedThought("Dec 24, 2018");
  firstThought.automaticThought = "first";

  const secondThought = newSavedThought("Dec 24, 2018");
  secondThought.automaticThought = "second";

  const groups = groupThoughtsByDay([firstThought, secondThought]);
  expect(groups.length).toBe(1);
  expect(groups[0].thoughts).toEqual([firstThought, secondThought]);
  expect(groups[0].date).toBe(new Date("Dec 24, 2018").toDateString());
});

test("groupThoughtsByDay displays the groups in order", () => {
  const groups = groupThoughtsByDay([
    // New Years
    newSavedThought("Jan 1, 2019"),

    // Christmas ones
    newSavedThought("Dec 25, 2018"),
    newSavedThought("Dec 25, 2018"),
    newSavedThought("Dec 25, 2018"),
  ]);

  expect(groups[0].date).toBe(new Date("Jan 1, 2019").toDateString());
  expect(groups[1].date).toBe(new Date("Dec 25, 2018").toDateString());
});

test("groupThoughtsByDay displays the thoughts in order", () => {
  const first = new Date("Dec 25, 2018");
  first.setTime(0);
  const second = new Date("Dec 25, 2018");
  second.setTime(100);
  const third = new Date("Dec 25, 2018");
  third.setTime(200);

  const unordered = [
    newSavedThought(first.toDateString()),
    newSavedThought(third.toDateString()),
    newSavedThought(second.toDateString()),
  ];

  // Ordered most recent first
  const ordered = [
    newSavedThought(third.toDateString()),
    newSavedThought(second.toDateString()),
    newSavedThought(first.toDateString()),
  ];

  const groups = groupThoughtsByDay(unordered);
  expect(groups[0].thoughts).toEqual(ordered);
});
