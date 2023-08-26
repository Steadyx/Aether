<div align="center">
  <img src="./aether.svg" alt="Aether Logo" style="width: 200px;"/>
</div>

# Aether: A Minimalist JSON Parser

Aether is a powerful and minimalist JSON parser designed with a strong sense of community in mind. It provides a simple and efficient way to parse JSON strings into a structured format, enabling developers to work with JSON data effortlessly.

## Features:
- **Lightweight:** Aether is designed to be minimalistic, providing only the essential features needed for JSON parsing.
- **Easy to Use:** With a simple API, Aether is accessible to developers of all skill levels.
- **Extensible:** Aether's modular design allows for easy customization and extension.
- **Community-Driven:** Aether values community contributions and encourages collaboration.

---

##Ever wondered how a JSON string transforms into a structured format you can manipulate? Aether does this elegantly, and here's a sneak peek into its magic!

### 🎭 The Original JSON String

\`\`\`json
{
  "hello": "world",
  "embedded": {
    "numbers": 12,
    "numbers2": [1, 2, 3, 4],
    "strings": ["hello", "world"]
  }
}
\`\`\`

### 🎨 Tokenized Form

Aether first breaks down the JSON string into a series of tokens. Each token represents a fundamental unit of the string.

\`\`\`json
[
  { "type": "PUNCTUATION", "value": "{" },
  { "type": "STRING", "value": "\"hello\"" },
  ...
  { "type": "PUNCTUATION", "value": "}" }
]
\`\`\`

### 🌳 Abstract Syntax Tree (AST)

Next, Aether constructs an Abstract Syntax Tree (AST), which represents the hierarchical structure of the JSON data.

\`\`\`json
{
  "type": "ObjectExpression",
  "properties": [
    {
      "type": "Property",
      "key": { "type": "StringLiteral", "value": "hello" },
      "value": { "type": "StringLiteral", "value": "world" }
    },
    ...
  ]
}
\`\`\`



## Installation:
 -- Nothing yet 

