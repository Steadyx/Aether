export type Token =
  | NumberToken
  | StringToken
  | PunctuationToken
  | BooleanToken
  | NullToken
  | CommentToken;

export interface NumberToken {
  type: "NUMBER";
  value: number;
}

export interface StringToken {
  type: "STRING";
  value: string;
}

export interface PunctuationToken {
  type: "PUNCTUATION";
  value: string;
}

export interface BooleanToken {
  type: "BOOLEAN";
  value: boolean;
}

export interface NullToken {
  type: "NULL";
  value: null;
}

export interface CommentToken {
  type: "COMMENT";
  value: string;
}

export type TokenResult = { value?: Token; rest: string };
