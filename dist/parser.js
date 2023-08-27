"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArray = exports.parseObject = exports.parseNullLiteral = exports.parseBooleanLiteral = exports.parseStringLiteral = exports.parseNumberLiteral = exports.walk = exports.parse = void 0;
var parse = function (tokens) {
    var ast = (0, exports.walk)(tokens, 0)[0];
    return ast;
};
exports.parse = parse;
var walk = function (tokens, index) {
    var token = tokens[index];
    if (token.type === "NUMBER")
        return (0, exports.parseNumberLiteral)(token, index);
    if (token.type === "STRING")
        return (0, exports.parseStringLiteral)(token, index);
    if (token.type === "PUNCTUATION") {
        if (token.value === "{")
            return (0, exports.parseObject)(tokens, index);
        if (token.value === "[")
            return (0, exports.parseArray)(tokens, index);
    }
    if (token.type === "BOOLEAN")
        return (0, exports.parseBooleanLiteral)(token, index);
    if (token.type === "NULL")
        return (0, exports.parseNullLiteral)(token, index);
    throw new Error("Unknown token: ".concat(JSON.stringify(token)));
};
exports.walk = walk;
var parseNumberLiteral = function (token, index) {
    return [{ type: "NumberLiteral", value: token.value }, index + 1];
};
exports.parseNumberLiteral = parseNumberLiteral;
var parseStringLiteral = function (token, index) {
    return [
        { type: "StringLiteral", value: token.value.slice(1, -1) },
        index + 1,
    ];
};
exports.parseStringLiteral = parseStringLiteral;
var parseBooleanLiteral = function (token, index) {
    return [{ type: "BooleanLiteral", value: token.value }, index + 1];
};
exports.parseBooleanLiteral = parseBooleanLiteral;
var parseNullLiteral = function (_token, index) {
    return [{ type: "NullLiteral", value: null }, index + 1];
};
exports.parseNullLiteral = parseNullLiteral;
var parseObject = function (tokens, index) {
    var properties = [];
    index++;
    while (tokens[index].type !== "PUNCTUATION" || tokens[index].value !== "}") {
        var _a = (0, exports.walk)(tokens, index), key = _a[0], keyIndex = _a[1];
        if (tokens[keyIndex].type !== "PUNCTUATION" ||
            tokens[keyIndex].value !== ":") {
            throw new Error("Expected ':' but found '".concat(tokens[keyIndex].value, "'"));
        }
        var _b = (0, exports.walk)(tokens, keyIndex + 1), value = _b[0], valueIndex = _b[1];
        properties.push({ type: "Property", key: key, value: value });
        index = tokens[valueIndex].value === "," ? valueIndex + 1 : valueIndex;
    }
    return [{ type: "ObjectExpression", properties: properties }, index + 1];
};
exports.parseObject = parseObject;
var parseArray = function (tokens, index) {
    var elements = [];
    index++;
    while (tokens[index].type !== "PUNCTUATION" || tokens[index].value !== "]") {
        var _a = (0, exports.walk)(tokens, index), element = _a[0], elementIndex = _a[1];
        elements.push(element);
        index =
            tokens[elementIndex].value === "," ? elementIndex + 1 : elementIndex;
    }
    return [{ type: "ArrayExpression", elements: elements }, index + 1];
};
exports.parseArray = parseArray;
exports.default = exports.parse;
