"use client"
import { useEffect, useState } from "react";
import { LexicalAnalyzer } from "./utils/LexicalAnalyzer";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Parser } from "./utils/Parser";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch";

function App() {
    // const [Code, setCode] = useState("");
    const {debouncedValue ,searchedText: Code,handleChange:setCode}=useDebouncedSearch();
    
    let tokens
    useEffect(()=>{
        tokens = LexicalAnalyzer(debouncedValue);
        const p= new Parser(tokens);
        p.parse();

    },[debouncedValue])

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
                <div className="title">Output</div>
                <div className="tokens">
                    {tokens?.map((token, index) => (
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
            <Toaster toastOptions={{duration:2500}} />
        </div>
    );
}

export default App;
