import {
    ARITHMETIC_OPERATORS,
    BOOLEAN_DT,
    BREAKERS,
    COMPARISON_OPERATORS,
    IDENTIFIER_REGEX,
    KEYWORDS,
    PUNCTUATION,
    SKIBIDI_SLANG,
} from "./CONSTANTS";

type WordT = {
    word: string;
    lineNo: number;
};
type TokenT = {
    classType: string;
    word: string;
    lineNo: number;
};
const GenerateWords = (code: string) => {
    let w: WordT[] = [];
    let temp: string = "";

    const Lines = code.split("\n").filter((x) => x !== "");

    for (let row = 0; row < Lines.length; row++) {
        const line = Lines[row];
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            // For Comments
            if (temp === "/" && char === "/") {
                temp = "";
                break;
            }
            // For Comparision Operators
            else if (COMPARISON_OPERATORS.includes(temp + char)) {
                w.push({ word: temp + char, lineNo: row });
                temp = "";
            }
            // For Punctuations
            else if (PUNCTUATION.includes(char)) {
                w.push({ word: temp, lineNo: row });
                w.push({ word: char, lineNo: row });
                temp = "";
            } else if (char == " ") {
                w.push({ word: temp, lineNo: row });
                temp = "";
            }
            // For Average Breaker
            else if (BREAKERS.includes(char)) {
                w.push({ word: temp, lineNo: row });
                temp = char;
            } else if (i == line.length - 1) {
                w.push({ word: temp + char, lineNo: row });
                temp = "";
            }
            // Temp is not breaker
            else {
                temp += char;
            }
        }
        w.push({ word: "/n", lineNo: row });
    }

    return w.filter((x) => {
        return x.word !== " " && x.word !== "";
    });
};

const GenerateTokens = (Words: WordT[]): TokenT[] => {
    let _tokens: TokenT[] = [];
    Words.forEach((item) => {
        _tokens.push({
            classType: ValidateClass(item.word),
            word: item.word,
            lineNo: item.lineNo,
        });
    });
    return _tokens;
};

const ValidateClass = (word: string) => {
    const indentifierRegex = new RegExp(IDENTIFIER_REGEX, "g");
    if (KEYWORDS.includes(word)) {
        return "KEYWORD";
    } else if (COMPARISON_OPERATORS.includes(word)) {
        return "COMPARISON_OPERATORS";
    } else if (SKIBIDI_SLANG.includes(word)) {
        return "SKIBIDI_SLANG";
    } else if (PUNCTUATION.includes(word)) {
        return "PUNCTUATION";
    } else if (word === "/n") {
        return "LINE_BREAKER";
    } else if (ARITHMETIC_OPERATORS.includes(word)) {
        return "ARITHMETIC_OPERATOR";
    } else if (BOOLEAN_DT.includes(word)) {
        return "BOOLEAN_CONSTANT";
    } else if (indentifierRegex.exec(word)) {
        return "IDENTIFIER";
    }
    return "Invalid";
};

export const LexicalAnalyzer = (code: string) => {
    const Words = GenerateWords(code);
    const Tokens = GenerateTokens(Words);

    return JSON.stringify(
        {
            Tokens: Tokens,
        },
        null,
        2
    );
};
