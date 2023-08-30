import { Token } from "@/types/tokenTypes";
import { ASTNode } from "@/types/astTypes";
import { walk } from "@/parsing/helpers";

export const parse = (tokens: Token[]): ASTNode => {
  const filteredTokens = tokens.filter((token) => token.type !== "COMMENT");
  const [ast] = walk(filteredTokens, 0);
  return ast;
};

export default parse;
