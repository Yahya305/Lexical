import { BREAKERS, PUNCTUATION } from "./CONSTANTS";

const GenerateWords = (code: string) => {
    let w: string[] = [];
    let temp: string = "";
    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        if (PUNCTUATION.includes(char)) {
            w.push(temp);
            w.push(char);
            temp = "";
        } else if (BREAKERS.includes(char)) {
            if (temp) w.push(temp);
            if (char !== " " && char !== "\n") {
                temp = char;
            } else {
                temp = "";
            }
        } else {
            temp += char;
        }
    }
    return w;
};

export const LexicalAnalyzer = (code: string) => {
    const Words = GenerateWords(code);

    return JSON.stringify(
        {
            words: Words,
        },
        null,
        2
    );
};
