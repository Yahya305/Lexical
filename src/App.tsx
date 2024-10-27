import { useState } from "react";
import { LexicalAnalyzer } from "./utils/LexicalAnalyzer";
import "./App.css";
import { Parser } from "./utils/Parser";

function App() {
    const [Code, setCode] = useState("");
    const tokens = LexicalAnalyzer(Code);
    const p= new Parser(tokens);
    p.parse();
    return (
        <div className="app">
            <div className="input">
                <div className="title">Input</div>
                <textarea
                    value={Code}
                    onChange={(e) => setCode(e.target.value)}
                ></textarea>
            </div>
            <div className="tokens-warp">
                <div className="title">Out Put</div>
                <div className="tokens">
                    {tokens.map((token, index) => (
                        <div key={index} className="token">
                            <div className="tokenNo">Token No: {index + 1}</div>
                            <div className="class">
                                Class: {token.classType}
                            </div>
                            <div className="value">Word: {token.word}</div>
                            <div className="lineNo">
                                Line No: {token.lineNo}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
