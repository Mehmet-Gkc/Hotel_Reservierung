import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UserProvider from "./context/UserContext";
import { StyledEngineProvider } from "@mui/material/styles";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <UserProvider>
        <App />
      </UserProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
