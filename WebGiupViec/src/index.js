import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "jquery"; // Ensure jQuery is loaded first
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";
import reportWebVitals from "./reportWebVitals";

// Make jQuery globally available for Owl Carousel
import $ from "jquery";
window.$ = window.jQuery = $;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
