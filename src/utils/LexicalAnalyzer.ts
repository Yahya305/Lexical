import {
    ARITHMETIC_OPERATORS,
    ASSIGNMENT_OPERATORS,
    BOOLEAN_DT,
    BRACE_CLOSE,
    BRACE_OPEN,
    BREAKERS,
    COMPARISON_OPERATORS,
    CONDITIONAL_KEYWORD,
    DATA_TYPES,
    DECLERATORS,
    DOUBLE_REGEX,
    FLOAT_REGEX,
    IDENTIFIER_REGEX,
    INC_DEC_OPERATORS,
    INTEGER_REGEX,
    KEYWORDS,
    LOOP_KEYWORDS,
    PARENTHESES_CLOSE,
    PARENTHESES_OPEN,
    PUNCTUATION,
    STATEMENT_TERMINATOR,
} from "./CONSTANTS";

type WordT = {
    word: string;
    lineNo: number;
    classType?: string;
};
export type TokenT = {
    classType: string;
    word: string;
    lineNo: number;
};

const GenerateWords: (code: string) => WordT[] = (code) => {
    let words: WordT[] = [];
    let temp: string = "";
    const Lines: string[] = code.split("\n").filter((x) => x !== "");
    let isReadingString = false;
    let isReadingChar = false;
    for (let row = 0; row < Lines.length; row++) {
        const line = Lines[row];
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            // For Comments
            if (temp === "/" && char === "/") {
                temp = "";
                break;
            }

            // For Strings Reading End
            else if (isReadingString && char === '"') {
                words.push({
                    word: temp,
                    lineNo: row,
                    classType: "STRING_CONSTANT",
                });
                temp = "";
                isReadingString = false;
            }
            // For Strings Reading Start
            else if (char === '"') {
                words.push({ word: temp, lineNo: row });
                temp = "";
                isReadingString = true;
            }
            // Reading String
            else if (isReadingString && char !== '"') {
                temp += char;
            }

            // For Character
            else if (char === "'") {
                words.push({
                    word: temp,
                    lineNo: row,
                    classType: "CHAR_CONSTANT",
                });
                temp = "";
                isReadingString = false;
            }
            // Reading Char
            else if (isReadingChar && char !== "'") {
                let startingSingleQuote = char;
                let firstChar = line[i + 1];
                if (firstChar !== "\\") {
                } else {
                }
                temp += char;
            }
            // For Strings Reading Start
            else if (char === "'") {
                words.push({ word: temp, lineNo: row });
                temp = "";
                isReadingChar = true;
            }

            // For INC/DEC Operators
            else if (INC_DEC_OPERATORS.includes(temp + char)) {
                words.push({ word: temp + char, lineNo: row });
                temp = "";
            }
            // For Comparision Operators
            else if (COMPARISON_OPERATORS.includes(temp + char)) {
                words.push({ word: temp + char, lineNo: row });
                temp = "";
            }
            // For Punctuations
            else if (PUNCTUATION.includes(char)) {
                words.push({ word: temp, lineNo: row });
                words.push({ word: char, lineNo: row });
                temp = "";
            }
            // If Line Break
            else if (char == " ") {
                words.push({ word: temp, lineNo: row });
                temp = "";
            }
            // For Average Breaker
            else if (BREAKERS.includes(char)) {
                words.push({ word: temp, lineNo: row });
                temp = char;
            }
            // Dont know for what
            else if (i == line.length - 1) {
                words.push({ word: temp + char, lineNo: row });
                temp = "";
            }
            // Temp is not breaker
            else temp += char;
        }
        words.push({ word: "/n", lineNo: row });
    }
    return words.filter((x) => x.word !== " " && x.word !== "");
};

const GenerateTokens = (Words: WordT[]): TokenT[] => {
    let _tokens: TokenT[] = [];
    Words.forEach((item) => {
        _tokens.push({
            classType: item?.classType
                ? item.classType
                : ValidateClass(item.word),
            word: item.word,
            lineNo: item.lineNo + 1,
        });
    });
    return _tokens;
};

const ValidateClass = (word: string): string => {
    // Regex Executers
    const indentifierRegex = new RegExp(IDENTIFIER_REGEX, "g");
    const intRegex = new RegExp(INTEGER_REGEX, "g");
    const floatRegex = new RegExp(FLOAT_REGEX, "g");
    const doubleRegex = new RegExp(DOUBLE_REGEX, "g");

    if (KEYWORDS.includes(word)) {
        return "KEYWORD";
    } else if (INC_DEC_OPERATORS.includes(word)) {
        return "INC/DEC_OPERATOR";
    } else if (COMPARISON_OPERATORS.includes(word)) {
        return "COMPARISON_OPERATORS";
    } else if (ASSIGNMENT_OPERATORS.includes(word)) {
        return "ASSIGNMENT_OPERATORS";
    } else if (PUNCTUATION.includes(word)) {
        return "PUNCTUATION";
    } else if (CONDITIONAL_KEYWORD.includes(word)) {
        return "CONDITIONAL_KEYWORD";
    } else if (word === "/n") {
        return "LINE_BREAKER";
    } else if (word === PARENTHESES_OPEN) {
        return "PARENTHESES_OPEN";
    } else if (word === PARENTHESES_CLOSE) {
        return "PARENTHESES_CLOSE";
    } else if (word === BRACE_OPEN) {
        return "BRACE_OPEN";
    } else if (word === BRACE_CLOSE) {
        return "BRACE_CLOSE";
    } else if (ARITHMETIC_OPERATORS.includes(word)) {
        return "ARITHMETIC_OPERATOR";
    } else if (BOOLEAN_DT.includes(word)) {
        return "BOOLEAN_CONSTANT";
    } else if (floatRegex.exec(word)) {
        return "FLOAT_CONSTANT";
    } else if (intRegex.exec(word)) {
        return "INTEGER_CONSTANT";
    } else if (doubleRegex.exec(word)) {
        return "DOUBLE_CONSTANT";
    } else if (DATA_TYPES.includes(word)) {
        return "DATA_TYPE";
    } else if (indentifierRegex.exec(word)) {
        return "IDENTIFIER";
    } else if (DECLERATORS.includes(word)) {
        return "DECLERATOR";
    } else if (LOOP_KEYWORDS.includes(word)) {
        return "LOOP_KEYWORDS";
    } else if (word === STATEMENT_TERMINATOR) {
        return "STATEMENT_TERMINATOR";
    }
    return "Invalid";
};

export const LexicalAnalyzer = (code: string): TokenT[] => {
    const Words = GenerateWords(code);
    const Tokens = GenerateTokens(Words);
    console.log(Tokens);
    return Tokens;
};
