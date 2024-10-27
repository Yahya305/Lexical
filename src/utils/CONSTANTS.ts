// Punctuation characters
export const PUNCTUATION: string[] = [
    // "{",
    // "}",
    // "(",
    // ")",
    '"',
    "'",
    // ";",
    ":",
    "[",
    "]",
    ",",
];

export const PARENTHESES_OPEN= "(" 
export const PARENTHESES_CLOSE= ")" 
export const BRACE_OPEN= "{" 
export const BRACE_CLOSE= "}" 

export const STATEMENT_TERMINATOR = ";"

// Arithmetic operators
export const ARITHMETIC_OPERATORS: string[] = ["+", "-", "*", "/", "%"];

// Comparison operators
export const COMPARISON_OPERATORS: string[] = [
    "==",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
];

export const INCREMENT_OPERATOR: string = "++";
export const DECREMENT_OPERATOR: string = "--";
export const INC_DEC_OPERATORS: string[] = [
    INCREMENT_OPERATOR,
    DECREMENT_OPERATOR,
];

// Logical operators
export const LOGICAL_OPERATORS: string[] = ["&&", "||", "!"];

// Assignment operators
export const ASSIGNMENT_OPERATORS: string[] = [
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
];

// Bitwise operators
export const BITWISE_OPERATORS: string[] = ["&", "|", "^", "~", "<<", ">>"];

// All Operators
export const OPERATORS: string[] = [
    ...ARITHMETIC_OPERATORS,
    ...COMPARISON_OPERATORS,
    ...LOGICAL_OPERATORS,
    ...ASSIGNMENT_OPERATORS,
    ...BITWISE_OPERATORS,
];

// Keywords (example set, adjust as needed)
export const KEYWORDS: string[] = [
    // "when",
    "else",
    // "asLongAs",
    // "iterate",
    "sendBack",
    "function",
    "empty",
];

export const CONDITIONAL_KEYWORD=["when"]

export const LOOP_KEYWORDS=[
    "iterate",
    "asLongAs",
]

export const DECLERATORS=[
    "maanlo",
    "let",
    "const",
]

export const BOOLEAN_DT: string[] = ["false", "true"];

export const DATA_TYPES: string[] = [
    "number",
    "double",
    "flag",
    "alpha",
    ...BOOLEAN_DT,
];

// Identifiers (not predefined, but for recognition)
export const IDENTIFIER_REGEX: RegExp = /^__[a-zA-Z0-9_]+__$/;

// Numeric literals (integers and floating-point)
export const INTEGER_REGEX: RegExp = /^-?\d+$/;
export const FLOAT_REGEX: RegExp = /^-?\d*\.\d+$/;
export const DOUBLE_REGEX: RegExp = /^-?\d*\.\d+$/;
export const NUMERIC_LITERALS_REGEX: RegExp = /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/;

// String literals (quoted strings)
export const STRING_LITERALS_REGEX: RegExp = /^".*"$|^'.*'$/;

// Breakers or delimiters
export const BREAKERS: string[] = [
    " ",
    "\n",
    "\t",
    "\r",
    '"',
    "'",
    ...PUNCTUATION,
    ...OPERATORS,
];
