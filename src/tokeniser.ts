import { Token, TokenResult } from "./tokenTypes";

import { consumeNumber, consumeString, consumePunctuation } from "./helpers";

const tokenRules: { regex: RegExp; action: (input: string) => TokenResult }[] =
  [
    {
      regex: /^\s+/,
      action: (input: string) => ({ rest: input.replace(/^\s+/, "") }),
    },
    { regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/, action: consumeNumber },
    { regex: /^['"](?:[^'"]|\\.)*['"]/, action: consumeString },
    { regex: /^[{}:\[\],]/, action: consumePunctuation },
  ];

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  while (input.length > 0) {
    let matched = false;
    for (const rule of tokenRules) {
      if (rule.regex.test(input)) {
        const { value, rest } = rule.action(input);
        if (value) tokens.push(value);
        input = rest;
        matched = true;
        break;
      }
    }
    if (!matched) {
      throw new Error(`No matching rule for character '${input[0]}'`);
    }
  }
  return tokens;
};

export default tokenize;
