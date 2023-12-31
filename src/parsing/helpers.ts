import {
  Token,
  NumberToken,
  StringToken,
  BooleanToken,
  NullToken,
} from "./tokenTypes";

import {
  ASTNode,
  ObjectExpression,
  NumberLiteral,
  StringLiteral,
  BooleanLiteral,
  NullLiteral,
  ArrayExpression,
  Property,
} from "./astTypes";

export const parseNumberLiteral = (
  token: NumberToken,
  index: number,
): [NumberLiteral, number] => {
  return [{ type: "NumberLiteral", value: token.value }, index + 1];
};

export const parseStringLiteral = (
  token: StringToken,
  index: number,
): [StringLiteral, number] => {
  return [
    { type: "StringLiteral", value: token.value.slice(1, -1) },
    index + 1,
  ];
};

export const parseBooleanLiteral = (
  token: BooleanToken,
  index: number,
): [BooleanLiteral, number] => {
  return [{ type: "BooleanLiteral", value: token.value }, index + 1];
};

export const parseNullLiteral = (
  _token: NullToken,
  index: number,
): [NullLiteral, number] => {
  return [{ type: "NullLiteral", value: null }, index + 1];
};

export const parseObject = (
  tokens: Token[],
  index: number,
): [ObjectExpression, number] => {
  const properties: Property[] = [];

  index++;

  while (tokens[index].type !== "PUNCTUATION" || tokens[index].value !== "}") {
    const [key, keyIndex] = walk(tokens, index);
    if (
      tokens[keyIndex].type !== "PUNCTUATION" ||
      tokens[keyIndex].value !== ":"
    ) {
      throw new Error(`Expected ':' but found '${tokens[keyIndex].value}'`);
    }

    const [value, valueIndex] = walk(tokens, keyIndex + 1);

    properties.push({ type: "Property", key: key as StringLiteral, value });
    index = tokens[valueIndex].value === "," ? valueIndex + 1 : valueIndex;
  }

  return [{ type: "ObjectExpression", properties }, index + 1];
};

export const parseArray = (
  tokens: Token[],
  index: number,
): [ArrayExpression, number] => {
  const elements: ASTNode[] = [];

  index++;

  while (tokens[index].type !== "PUNCTUATION" || tokens[index].value !== "]") {
    const [element, elementIndex] = walk(tokens, index);

    elements.push(element);
    index =
      tokens[elementIndex].value === "," ? elementIndex + 1 : elementIndex;
  }

  return [{ type: "ArrayExpression", elements }, index + 1];
};

export const walk = (tokens: Token[], index: number): [ASTNode, number] => {
  const token = tokens[index];
  if (token.type === "NUMBER") return parseNumberLiteral(token, index);
  if (token.type === "STRING") return parseStringLiteral(token, index);
  if (token.type === "PUNCTUATION") {
    if (token.value === "{") return parseObject(tokens, index);
    if (token.value === "[") return parseArray(tokens, index);
  }
  if (token.type === "BOOLEAN") return parseBooleanLiteral(token, index);
  if (token.type === "NULL") return parseNullLiteral(token, index);

  throw new Error(`Unknown token: ${JSON.stringify(token)}`);
};
