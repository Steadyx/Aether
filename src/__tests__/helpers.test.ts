import { consumeNumber, consumeString, consumePunctuation } from "../helpers";

describe("helpers", () => {
  test("consumeNumber should parse a number", () => {
    const input: string = "42 rest of the string";
    const result = consumeNumber(input);
    expect(result).toEqual({
      value: { type: "NUMBER", value: 42 },
      rest: " rest of the string",
    });
  });

  test("consumeString should parse a string", () => {
    const input: string = '"hello" rest of the string';
    const result = consumeString(input);
    expect(result).toEqual({
      value: { type: "STRING", value: '"hello"' },
      rest: " rest of the string",
    });
  });

  test("consumePunctuation should parse a punctuation", () => {
    const input: string = ", rest of the string";
    const result = consumePunctuation(input);
    expect(result).toEqual({
      value: { type: "PUNCTUATION", value: "," },
      rest: " rest of the string",
    });
  });
});
