<div align="center">
  <img src="./aether.svg" alt="Aether Logo" style="width: 100px;"/>
</div>

# Aether: A Minimalist JSON Parser

Aether is a powerful and minimalist JSON parser designed with a strong sense of community in mind. It provides a simple and efficient way to parse JSON strings into a structured format, enabling developers to work with JSON data effortlessly.

## Features:
- **Lightweight:** Aether is designed to be minimalistic, providing only the essential features needed for JSON parsing.
- **Easy to Use:** With a simple API, Aether is accessible to developers of all skill levels.
- **Extensible:** Aether's modular design allows for easy customization and extension.
- **Community-Driven:** Aether values community contributions and encourages collaboration.

---

### Ever wondered how a JSON string transforms into a structured format you can manipulate? Aether does this elegantly, and here's a sneak peek into its magic!


## Installation:
 ```bash
  npm i -g @steadyx/aether
 ```


### 🎭 The Original JSON String


```json
{
  "hello": "world",
  "embedded": {
    "numbers": 12,
    "numbers2": [1, 2, 3, 4],
    "strings": ["hello", "world"]
  }
}
```

### 🎨 Tokenized Form

Aether first breaks down the JSON string into a series of tokens. Each token represents a fundamental unit of the string.

```json
[
  { "type": "PUNCTUATION", "value": "{" },
  { "type": "STRING", "value": "\"hello\"" },
  { "type": "PUNCTUATION", "value": ":" },
  { "type": "STRING", "value": "\"world\"" },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "STRING", "value": "\"embedded\"" },
  { "type": "PUNCTUATION", "value": ":" },
  { "type": "PUNCTUATION", "value": "{" },
  { "type": "STRING", "value": "\"numbers\"" },
  { "type": "PUNCTUATION", "value": ":" },
  { "type": "NUMBER", "value": 12 },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "STRING", "value": "\"numbers2\"" },
  { "type": "PUNCTUATION", "value": ":" },
  { "type": "PUNCTUATION", "value": "[" },
  { "type": "NUMBER", "value": 1 },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "NUMBER", "value": 2 },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "NUMBER", "value": 3 },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "NUMBER", "value": 4 },
  { "type": "PUNCTUATION", "value": "]" },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "STRING", "value": "\"strings\"" },
  { "type": "PUNCTUATION", "value": ":" },
  { "type": "PUNCTUATION", "value": "[" },
  { "type": "STRING", "value": "\"hello\"" },
  { "type": "PUNCTUATION", "value": "," },
  { "type": "STRING", "value": "\"world\"" },
  { "type": "PUNCTUATION", "value": "]" },
  { "type": "PUNCTUATION", "value": "}" },
  { "type": "PUNCTUATION", "value": "}" }
]
```

### 🌳 Abstract Syntax Tree (AST)

Next, Aether constructs an Abstract Syntax Tree (AST), which represents the hierarchical structure of the JSON data.

```json
{
  "type": "ObjectExpression",
  "properties": [
    {
      "type": "Property",
      "key": { "type": "StringLiteral", "value": "hello" },
      "value": { "type": "StringLiteral", "value": "world" }
    },
    {
      "type": "Property",
      "key": { "type": "StringLiteral", "value": "embedded" },
      "value": {
        "type": "ObjectExpression",
        "properties": [
          {
            "type": "Property",
            "key": { "type": "StringLiteral", "value": "numbers" },
            "value": { "type": "NumberLiteral", "value": 12 }
          },
          {
            "type": "Property",
            "key": { "type": "StringLiteral", "value": "numbers2" },
            "value": {
              "type": "ArrayExpression",
              "elements": [
                { "type": "NumberLiteral", "value": 1 },
                { "type": "NumberLiteral", "value": 2 },
                { "type": "NumberLiteral", "value": 3 },
                { "type": "NumberLiteral", "value": 4 }
              ]
            }
          },
          {
            "type": "Property",
            "key": { "type": "StringLiteral", "value": "strings" },
            "value": {
              "type": "ArrayExpression",
              "elements": [
                { "type": "StringLiteral", "value": "hello" },
                { "type": "StringLiteral", "value": "world" }
              ]
            }
          }
        ]
      }
    }
  ]
}
```




