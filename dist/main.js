#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJSON = void 0;
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
var tokeniser_1 = require("./tokeniser");
var parser_1 = require("./parser");
var fs = require("fs");
var formatJSON = function (node, indentLevel) {
    if (indentLevel === void 0) { indentLevel = 0; }
    var indent = "  ".repeat(indentLevel);
    switch (node.type) {
        case "StringLiteral":
            return "\"".concat(node.value, "\"");
        case "BooleanLiteral":
            return "".concat(node.value);
        case "NullLiteral":
            return "null";
        case "NumberLiteral":
            return "".concat(node.value);
        case "ObjectExpression":
            var formattedProperties = node.properties.map(function (prop) {
                var key = "\"".concat(prop.key.value, "\"");
                var value = (0, exports.formatJSON)(prop.value, indentLevel + 1);
                return "".concat(indent, "  ").concat(key, ": ").concat(value);
            });
            return "{\n".concat(formattedProperties.join(",\n"), "\n").concat(indent, "}");
        case "ArrayExpression":
            var formattedElements = node.elements.map(function (el) {
                return "".concat(indent, "  ").concat((0, exports.formatJSON)(el, indentLevel + 1));
            });
            return "[\n".concat(formattedElements.join(",\n"), "\n").concat(indent, "]");
        default:
            throw new Error("Unknown node type: ".concat(node.type));
    }
};
exports.formatJSON = formatJSON;
var argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("f", {
    alias: "format",
    description: "Format a JSON file",
    type: "string",
})
    .help()
    .alias("help", "h").argv;
try {
    var filePath = argv.f ? argv.f : argv._[0];
    var json = fs.readFileSync(filePath, "utf8");
    var tokens = (0, tokeniser_1.default)(json);
    var ast = (0, parser_1.default)(tokens);
    if (!argv.f)
        console.log("AST:", JSON.stringify(ast, null, 2));
    if (argv.f) {
        var formattedJson = (0, exports.formatJSON)(ast);
        fs.writeFileSync(filePath, formattedJson);
        console.log("Formatted JSON has been written to the file.");
    }
}
catch (error) {
    console.error("An error occurred:", error);
}
