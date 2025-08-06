import "@/utils/global.ts";
import "@/assets/styles/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "@/App.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/styles";

import { GlobalProvider } from "@/providers";
import { PageScrollToTop } from "@/components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PageScrollToTop />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  </StrictMode>,
);
