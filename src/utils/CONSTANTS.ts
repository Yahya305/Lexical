// Punctuation characters
export const PUNCTUATION = [
    "{",
    "}",
    "(",
    ")",
    '"',
    "'",
    ";",
    ":",
    "[",
    "]",
    ".",
    ",",
];

// Arithmetic operators
export const ARITHMETIC_OPERATORS = ["+", "-", "*", "/", "%"];

// Comparison operators
export const COMPARISON_OPERATORS = ["==", "!=", ">", "<", ">=", "<="];

// Logical operators
export const LOGICAL_OPERATORS = ["&&", "||", "!"];

// Assignment operators
export const ASSIGNMENT_OPERATORS = ["=", "+=", "-=", "*=", "/=", "%="];

// Bitwise operators
export const BITWISE_OPERATORS = ["&", "|", "^", "~", "<<", ">>"];

// All Operators
export const OPERATORS = [
    ...ARITHMETIC_OPERATORS,
    ...COMPARISON_OPERATORS,
    ...LOGICAL_OPERATORS,
    ...ASSIGNMENT_OPERATORS,
    ...BITWISE_OPERATORS,
];

// Keywords (example set, adjust as needed)
export const KEYWORDS = [
    "if",
    "else",
    "while",
    "for",
    "return",
    "function",
    "var",
    "let",
    "const",
];

// Identifiers (not predefined, but for recognition)
export const IDENTIFIER_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

// Numeric literals (integers and floating-point)
export const NUMERIC_LITERALS_REGEX = /^\d+(\.\d+)?$/;

// String literals (quoted strings)
export const STRING_LITERALS_REGEX = /^".*"$|^'.*'$/;

// Breakers or delimiters
export const BREAKERS = [
    " ",
    "\n",
    "\t",
    "\r",
    '"',
    "'",
    ...PUNCTUATION,
    ...OPERATORS,
];
