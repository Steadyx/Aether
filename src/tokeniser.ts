import { Token, TokenResult } from "./tokenTypes";

import {
  consumeNumber,
  consumeWhitespace,
  consumeString,
  consumePunctuation,
  consumeBoolean,
  consumeNull,
} from "./helpers";

const tokenRules: { regex: RegExp; action: (input: string) => TokenResult }[] =
  [
    { regex: /^\s+/, action: consumeWhitespace },
    { regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/, action: consumeNumber },
    { regex: /^['"](?:[^'"]|\\.)*['"]/, action: consumeString },
    { regex: /^[{}:\[\],]/, action: consumePunctuation },
    { regex: /^true|false/, action: consumeBoolean },
    { regex: /^null/, action: consumeNull },
  ];

const applyFirstMatchingRule = (input: string) => {
  for (const rule of tokenRules) {
    if (rule.regex.test(input)) {
      return rule.action(input);
    }
  }
  
  throw new Error(`No matching rule for character '${input[0]}'`);
};

const tokenizeChunk = (input: string, tokens: Token[]) => {
  const { value, rest } = applyFirstMatchingRule(input);
  if (value) tokens.push(value);
  return rest;
};

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];

  while (input.length > 0) {
    input = tokenizeChunk(input, tokens);
  }

  return tokens;
};

export default tokenize;
