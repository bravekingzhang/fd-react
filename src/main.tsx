import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextProvider } from "@arco-design/mobile-react";
import "./index.css";
import setRootPixel from "@arco-design/mobile-react/tools/flexible";
import "@arco-design/mobile-react/tools/touch2mouse";
import useGlobalStore from "./store/global.ts";

export const StrictModeAppWithDarkModeContext = () => {
  const { darkMode } = useGlobalStore();
  return (
    <React.StrictMode>
      <ContextProvider isDarkMode={darkMode}>
        <App />
      </ContextProvider>
    </React.StrictMode>
  );
};

setRootPixel();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictModeAppWithDarkModeContext />
);
