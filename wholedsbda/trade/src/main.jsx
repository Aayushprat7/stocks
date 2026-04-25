import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" }, // Indigo primary
    secondary: { main: "#10b981" }, // Success green
    background: { default: "#0b0e14", paper: "#151921" },
  },
  typography: { fontFamily: "'Inter', sans-serif" },
  shape: { borderRadius: 8 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);