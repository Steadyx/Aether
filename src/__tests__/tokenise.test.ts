import { tokenize } from "../tokeniser";

describe("tokenize", () => {
test("tokenize should tokenize a simple string", () => {
  const input = `{"key": "value"}`;
  const result = tokenize(input);
  expect(result).toEqual([
    { type: "PUNCTUATION", value: "{" },
    { type: "STRING", value: '"key"' },
    { type: "PUNCTUATION", value: ":" },
    { type: "STRING", value: '"value"' },
    { type: "PUNCTUATION", value: "}" },
  ]);
});
});
