import { createRoot } from "react-dom/client";
import App from "./App.tsx";

window.addEventListener("DOMContentLoaded", () => {
    // HS_REACT Section
    createRoot(document.getElementById("LEXICAL__ANALYZER")!).render(<App />);
});
