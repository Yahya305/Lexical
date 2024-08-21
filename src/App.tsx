import { useState } from "react";
import { LexicalAnalyzer } from "./utils/LexicalAnalyzer";

function App() {
    const [Code, setCode] = useState("");
    return (
        <div className="app">
            <textarea
                value={Code}
                onChange={(e) => setCode(e.target.value)}
                cols={30}
                rows={10}
            ></textarea>
            <div className="tokens">
                <h2>Tokens: </h2>
                <pre style={{ fontSize: 8 }}>
                    {/* Render JSON String Here */}
                    {LexicalAnalyzer(Code)}
                </pre>
            </div>
        </div>
    );
}

export default App;
