import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3Provider } from "./context/Web3Context";

ReactDOM.render(
    <Web3Provider>
        <App />
    </Web3Provider>,
    document.getElementById("root")
);
