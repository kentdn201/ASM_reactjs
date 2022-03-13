import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.defaults.baseURL = 'https://60dff0ba6b689e001788c858.mockapi.io/tokens';

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
