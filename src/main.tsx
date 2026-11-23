
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import App from "./App";
import { store } from "./app/store";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
