import {
  Token,
} from "./tokenTypes";

import {
  ASTNode,
} from "./astTypes";

import {walk } from './helpers';


export const parse = (tokens: Token[]): ASTNode => {
  const filteredTokens = tokens.filter((token) => token.type !== "COMMENT");
  const [ast] = walk(filteredTokens, 0);
  return ast;
};


