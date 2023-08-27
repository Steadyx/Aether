"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNull = exports.consumeBoolean = exports.consumePunctuation = exports.consumeString = exports.consumeNumber = exports.consumeWhitespace = void 0;
var consumeWhitespace = function (input) {
    return { rest: input.replace(/^\s+/, "") };
};
exports.consumeWhitespace = consumeWhitespace;
var consumeNumber = function (input) {
    var match = input.match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?/);
    return {
        value: { type: "NUMBER", value: parseFloat(match[0]) },
        rest: input.slice(match[0].length),
    };
};
exports.consumeNumber = consumeNumber;
var consumeString = function (input) {
    var quote = input[0];
    var match = input.match(new RegExp("^".concat(quote, "(?:[^").concat(quote, "\\\\]|\\\\.)*").concat(quote)));
    return {
        value: { type: "STRING", value: match[0] },
        rest: input.slice(match[0].length),
    };
};
exports.consumeString = consumeString;
var consumePunctuation = function (input) {
    return {
        value: { type: "PUNCTUATION", value: input[0] },
        rest: input.slice(1),
    };
};
exports.consumePunctuation = consumePunctuation;
var consumeBoolean = function (input) {
    var matchTrue = input.match(/^true/);
    var matchFalse = input.match(/^false/);
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
exports.consumeBoolean = consumeBoolean;
var consumeNull = function (input) {
    var match = input.match(/^null/);
    if (match) {
        return {
            value: { type: "NULL", value: null },
            rest: input.slice(4),
        };
    }
    throw new Error("Invalid null token");
};
exports.consumeNull = consumeNull;
