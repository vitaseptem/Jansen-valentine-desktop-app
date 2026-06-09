import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(13, 11, 9, 0.95)",
            color: "#F8F4ED",
            border: "1px solid rgba(200, 173, 127, 0.2)",
            borderRadius: "10px",
            fontSize: "13px",
            fontFamily: "'Inter Tight', sans-serif",
            letterSpacing: "0.01em",
            padding: "12px 16px",
            backdropFilter: "blur(12px)",
          },
          success: { iconTheme: { primary: "#C8AD7F", secondary: "#0a0807" } },
          error:   { iconTheme: { primary: "#9B3A3A", secondary: "#0a0807" } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);
