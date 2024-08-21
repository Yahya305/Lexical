import { BREAKERS, PUNCTUATION } from "./CONSTANTS";

type WordT = {
    word: string;
    lineNo: number;
};
const GenerateWords = (code: string) => {
    let w: WordT[] = [];
    let temp: string = "";

    const Lines = code.split("\n").filter((x) => x !== "");
    // let isUnderComment = false

    for (let row = 0; row < Lines.length; row++) {
        const line = Lines[row];
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (temp == "/" && char == "/") {
                break;
            }
            else if (PUNCTUATION.includes(char)) {
                w.push({ word: temp, lineNo: row });
                w.push({ word: char, lineNo: row });
                temp = "";
            } else if (BREAKERS.includes(char)) {
                w.push({ word: temp, lineNo: row });
                temp = char;
            } else {
                temp += char;
            }
        }
        w.push({ word: "/n", lineNo: row });
    }

    return w.filter((x) => {
        return x.word !== " " && x.word !== "";
    });
};

const GenerateTokens = (Words: WordT[]) => {
    let _tokens: {}[] = [];
    Words.forEach((item) => {
        _tokens.push({
            tokenClass: "invalid",
            word: item.word,
            lineNo: item.lineNo,
        });
    });
    return _tokens;
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
