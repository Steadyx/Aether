import { NumberToken, StringToken, PunctuationToken } from "./tokenTypes";

export const consumeNumber = (input: string): { value: NumberToken; rest: string } => {
  const match = input.match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?/);
  return {
    value: { type: "NUMBER", value: parseFloat(match![0]) },
    rest: input.slice(match![0].length),
  };
};

export const consumeString = (input: string): { value: StringToken; rest: string } => {
  const quote = input[0];
  const match = input.match(
    new RegExp(`^${quote}(?:[^${quote}\\\\]|\\\\.)*${quote}`),
  );
  return {
    value: { type: "STRING", value: match![0] },
    rest: input.slice(match![0].length),
  };
};

export const consumePunctuation = (
  input: string,
): { value: PunctuationToken; rest: string } => {
  return {
    value: { type: "PUNCTUATION", value: input[0] },
    rest: input.slice(1),
  };
};
