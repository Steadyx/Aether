export type ASTNode =
  | ObjectExpression
  | ArrayExpression
  | Property
  | StringLiteral
  | NumberLiteral;

export interface ObjectExpression {
  type: "ObjectExpression";
  properties: Property[];
}

export interface ArrayExpression {
  type: "ArrayExpression";
  elements: ASTNode[];
}

export interface Property {
  type: "Property";
  key: StringLiteral;
  value: ASTNode;
}

export interface StringLiteral {
  type: "StringLiteral";
  value: string;
}

export interface NumberLiteral {
  type: "NumberLiteral";
  value: number;
}

