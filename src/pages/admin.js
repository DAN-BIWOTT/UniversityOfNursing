import React from "react";
import Dashboard from "../containers/Dashboard";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global";
import { darkTheme, lightTheme } from "../styles/theme";
import { ThemeContextProvider, useThemeContext } from "../context/ThemeContext.js";

const Admin = () => {
  const { theme } = useThemeContext()
  return (
    <ThemeContextProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Dashboard />
      </ThemeProvider>
    </ThemeContextProvider>
  );
};

export default Admin;
