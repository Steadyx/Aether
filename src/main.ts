#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import tokenize from "./tokeniser";
import parse from "./parser";
import { ASTNode } from "./astTypes";
import * as fs from "fs";

interface Yarguments {
  f?: string;
  _: string[];
  $0: string;
}

export const formatJSON = (node: ASTNode, indentLevel: number = 0): string => {
  const indent = "  ".repeat(indentLevel);

  switch (node.type) {
    case "StringLiteral":
      return `"${node.value}"`;
    case "BooleanLiteral":
      return `${node.value}`;
    case "NullLiteral":
      return "null";
    case "NumberLiteral":
      return `${node.value}`;
    case "ObjectExpression":
      const formattedProperties = node.properties.map((prop) => {
        const key = `"${prop.key.value}"`;
        const value = formatJSON(prop.value, indentLevel + 1);
        return `${indent}  ${key}: ${value}`;
      });
      return `{\n${formattedProperties.join(",\n")}\n${indent}}`;
    case "ArrayExpression":
      const formattedElements = node.elements.map((el) => {
        return `${indent}  ${formatJSON(el, indentLevel + 1)}`;
      });
      return `[\n${formattedElements.join(",\n")}\n${indent}]`;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const removeTrailingNewline = (str: string): string => str.replace(/\n$/, "");

const argv = yargs(hideBin(process.argv))
  .option("f", {
    alias: "format",
    description: "Format a JSON file",
    type: "string",
  })
  .help()
  .alias("help", "h").argv as Yarguments;

try {
  const filePath = argv.f ? argv.f : argv._[0];

  const json = fs.readFileSync(filePath, "utf8");
  const tokens = tokenize(json);
  const ast = parse(tokens);

  if (!argv.f) console.log("AST:", JSON.stringify(ast, null, 2));

  if (argv.f) {
      const formattedJson = formatJSON(ast);
  const jsonWithoutNewline = removeTrailingNewline(formattedJson);
  fs.writeFileSync(argv.f, jsonWithoutNewline);
  console.log("Formatted JSON has been written to the file.");

  }
} catch (error) {
  console.error("An error occurred:", error);
}
