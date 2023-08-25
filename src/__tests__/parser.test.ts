import {
  parse,
} from "../parser";



describe("parse", () => {
  it("should parse a number", () => {
    expect(parse([{ type: "NUMBER", value: 42 }])).toEqual({
      type: "NumberLiteral",
      value: 42,
    });
  });

  it("should parse a string", () => {
    expect(parse([{ type: "STRING", value: '"hello"' }])).toEqual({
      type: "StringLiteral",
      value: "hello",
    });
  });

  it("should parse an object", () => {
    expect(
      parse([
        { type: "PUNCTUATION", value: "{" },
        { type: "STRING", value: '"hello"' },
        { type: "PUNCTUATION", value: ":" },
        { type: "STRING", value: '"world"' },
        { type: "PUNCTUATION", value: "}" },
      ]),
    ).toEqual({
      type: "ObjectExpression",
      properties: [
        {
          type: "Property",
          key: { type: "StringLiteral", value: "hello" },
          value: { type: "StringLiteral", value: "world" },
        },
      ],
    });
  });

  it("should parse an array", () => {
    expect(
      parse([
        { type: "PUNCTUATION", value: "[" },
        { type: "NUMBER", value: 42 },
        { type: "PUNCTUATION", value: "]" },
      ]),
    ).toEqual({
      type: "ArrayExpression",
      elements: [{ type: "NumberLiteral", value: 42 }],
    });
  });

  it("should parse nested objects", () => {
    expect(
      parse([
        { type: "PUNCTUATION", value: "{" },
        { type: "STRING", value: '"hello"' },
        { type: "PUNCTUATION", value: ":" },
        { type: "PUNCTUATION", value: "{" },
        { type: "STRING", value: '"world"' },
        { type: "PUNCTUATION", value: ":" },
        { type: "NUMBER", value: 42 },
        { type: "PUNCTUATION", value: "}" },
        { type: "PUNCTUATION", value: "}" },
      ]),
    ).toEqual({
      type: "ObjectExpression",
      properties: [
        {
          type: "Property",
          key: { type: "StringLiteral", value: "hello" },
          value: {
            type: "ObjectExpression",
            properties: [
              {
                type: "Property",
                key: { type: "StringLiteral", value: "world" },
                value: { type: "NumberLiteral", value: 42 },
              },
            ],
          },
        },
      ],
    });
  });

  it("should parse nested arrays", () => {
    expect(
      parse([
        { type: "PUNCTUATION", value: "[" },
        { type: "PUNCTUATION", value: "[" },
        { type: "NUMBER", value: 42 },
        { type: "PUNCTUATION", value: "]" },
        { type: "PUNCTUATION", value: "]" },
      ]),
    ).toEqual({
      type: "ArrayExpression",
      elements: [
        {
          type: "ArrayExpression",
          elements: [{ type: "NumberLiteral", value: 42 }],
        },
      ],
    });
  });

  it("should parse nested arrays and objects", () => {
    expect(
      parse([
        { type: "PUNCTUATION", value: "[" },
        { type: "PUNCTUATION", value: "{" },
        { type: "STRING", value: '"hello"' },
        { type: "PUNCTUATION", value: ":" },
        { type: "STRING", value: '"world"' },
        { type: "PUNCTUATION", value: "}" },
        { type: "PUNCTUATION", value: "]" },
      ]),
    ).toEqual({
      type: "ArrayExpression",
      elements: [
        {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              key: { type: "StringLiteral", value: "hello" },
              value: { type: "StringLiteral", value: "world" },
            },
          ],
        },
      ],
    });
  });
});

