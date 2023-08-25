import  tokenize  from './tokeniser';
import  parse  from './parser';

const code = `{
  "hello": "world",
  "embedded": {
    "numbers": 12,
    "numbers2": [1, 2, 3, 4],
    "strings": ["hello", "world"]
  }
}`;

const tokens = tokenize(code);
const ast = parse(tokens);
console.log(JSON.stringify(ast, null, 2));

