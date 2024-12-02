import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { SessionProvider } from "./components/SessionProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <SessionProvider>
            <App />
        </SessionProvider>
    </Router>,
);
