"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
var helpers_1 = require("./helpers");
var tokenRules = [
    { regex: /^\s+/, action: helpers_1.consumeWhitespace },
    { regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/, action: helpers_1.consumeNumber },
    { regex: /^['"](?:[^'"]|\\.)*['"]/, action: helpers_1.consumeString },
    { regex: /^[{}:\[\],]/, action: helpers_1.consumePunctuation },
    { regex: /^true|false/, action: helpers_1.consumeBoolean },
    { regex: /^null/, action: helpers_1.consumeNull },
];
var applyFirstMatchingRule = function (input) {
    for (var _i = 0, tokenRules_1 = tokenRules; _i < tokenRules_1.length; _i++) {
        var rule = tokenRules_1[_i];
        if (rule.regex.test(input)) {
            return rule.action(input);
        }
    }
    throw new Error("No matching rule for character '".concat(input[0], "'"));
};
var tokenizeChunk = function (input, tokens) {
    var _a = applyFirstMatchingRule(input), value = _a.value, rest = _a.rest;
    if (value)
        tokens.push(value);
    return rest;
};
var tokenize = function (input) {
    var tokens = [];
    while (input.length > 0) {
        input = tokenizeChunk(input, tokens);
    }
    return tokens;
};
exports.tokenize = tokenize;
exports.default = exports.tokenize;
