export type Token = NumberToken | StringToken | PunctuationToken;

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

export type TokenResult = { value?: Token; rest: string };
