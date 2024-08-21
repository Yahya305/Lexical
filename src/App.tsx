import { useState } from "react";

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
				<pre>
					{/* Render JSON String Here */}
				</pre>
			</div>
        </div>
    );
}

export default App;
