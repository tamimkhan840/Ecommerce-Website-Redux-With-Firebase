import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";
import { Provider } from "react-redux";
import store from "./app/store.js";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </StrictMode>
);
