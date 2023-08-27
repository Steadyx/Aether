import { NumberToken, StringToken, PunctuationToken, BooleanToken, NullToken } from "./tokenTypes";

export const consumeWhitespace = (input: string): { rest: string } => {
  return { rest: input.replace(/^\s+/, "") };
};

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
export const consumeBoolean = (input: string): { value: BooleanToken; rest: string } => {
  const matchTrue = input.match(/^true/);
  const matchFalse = input.match(/^false/);

  if (matchTrue) {
    return {
      value: { type: "BOOLEAN", value: true },
      rest: input.slice(4),
    };
  }

  if (matchFalse) {
    return {
      value: { type: "BOOLEAN", value: false },
      rest: input.slice(5),
    };
  }

  throw new Error("Invalid boolean token");
};

export const consumeNull = (input: string): { value: NullToken; rest: string } => {
  const match = input.match(/^null/);

  if (match) {
    return {
      value: { type: "NULL", value: null },
      rest: input.slice(4),
    };
  }

  throw new Error("Invalid null token");
};
