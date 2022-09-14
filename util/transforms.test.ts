import { transformRepositoryListToLanguageOccurence } from "./transforms";

describe("transformRepositoryListToLanguageOccurence", () => {
  test("orders by occurence", () => {
    const source = [
      { name: "Foo", languages: ["TypeScript", "Python", "Java"] },
      { name: "Bar", languages: ["TypeScript", "Python"] },
      { name: "Baz", languages: ["TypeScript"] },
    ];
    const dest = [
      ["TypeScript", 3],
      ["Python", 2],
      ["Java", 1],
    ];
    expect(transformRepositoryListToLanguageOccurence(source)).toStrictEqual(
      dest
    );
  });

  test("orders by name on equal occurences", () => {
    const source = [
      { name: "Foo", languages: ["A", "B", "C"] },
      { name: "Bar", languages: ["A", "B", "C"] },
      { name: "Baz", languages: ["A", "B", "C"] },
    ];
    const dest = [
      ["A", 3],
      ["B", 3],
      ["C", 3],
    ];
    expect(transformRepositoryListToLanguageOccurence(source)).toStrictEqual(
      dest
    );
  });
});
