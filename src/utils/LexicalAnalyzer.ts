import { BREAKERS, PUNCTUATION } from "./CONSTANTS";

type WordT = {
    word: string;
    lineNo: number;
};

const GenerateWords = (code: string): WordT[] => {
    let words: WordT[] = [];
    let temp: string = "";

    const Lines = code.split("\n");

    for (let row = 0; row < Lines.length; row++) {
        const line = Lines[row];
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (PUNCTUATION.includes(char)) {
                if (temp.trim()) {
                    words.push({ word: temp.trim(), lineNo: row + 1 });
                }
                words.push({ word: char, lineNo: row + 1 });
                temp = "";
            } else if (BREAKERS.includes(char)) {
                if (temp.trim()) {
                    words.push({ word: temp.trim(), lineNo: row + 1 });
                }
                temp = char;
                words.push({ word: temp, lineNo: row + 1 });
                temp = "";
            } else {
                temp += char;
            }
        }
        if (temp.trim()) {
            words.push({ word: temp.trim(), lineNo: row + 1 });
            temp = "";
        }
        words.push({ word: "\n", lineNo: row + 1 });
    }

    return words.filter((x) => x.word !== "" && x.word !== " ");
};

const GenerateTokens = (words: WordT[]) => {
    let tokens: {}[] = [];
    words.forEach((item) => {
        tokens.push({
            // tokenClass: "invalid",
            word: item.word,
            lineNo: item.lineNo,
        });
    });
    return tokens;
};

export const LexicalAnalyzer = (code: string): string => {
    const words = GenerateWords(code);
    const tokens = GenerateTokens(words);

    return JSON.stringify(
        {
            Tokens: tokens,
        },
        null,
        2
    );
};
