import { getLanguageOccurence } from "./transforms";

describe("getLanguageOccurence", () => {
  test("orders by occurence", () => {
    const input = [
      { name: "Foo", languages: ["TypeScript", "Python", "Java"] },
      { name: "Bar", languages: ["TypeScript", "Python"] },
      { name: "Baz", languages: ["TypeScript"] },
    ];
    const output = [
      { language: "TypeScript", occurence: 3 },
      { language: "Python", occurence: 2 },
      { language: "Java", occurence: 1 },
    ];
    expect(getLanguageOccurence(input)).toStrictEqual(output);
  });

  test("orders by name on equal occurences", () => {
    const input = [
      { name: "Foo", languages: ["A", "B", "C"] },
      { name: "Bar", languages: ["A", "B", "C"] },
      { name: "Baz", languages: ["A", "B", "C"] },
    ];
    const output = [
      { language: "A", occurence: 3 },
      { language: "B", occurence: 3 },
      { language: "C", occurence: 3 },
    ];
    expect(getLanguageOccurence(input)).toStrictEqual(output);
  });
});
