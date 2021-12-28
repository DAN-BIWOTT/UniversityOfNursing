import React,{useEffect} from "react";
import Dashboard from "../containers/Dashboard";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global";
import { darkTheme, lightTheme } from "../styles/theme";
import { ThemeContextProvider, useThemeContext } from "../context/ThemeContext.js";
import tawkTo from "tawkto-react";

const Client = () => {

const tawkToPropertyId = '61caba6fc82c976b71c3c3c1'

const tawkToKey = '4dd464c8c21ae08a883035ce9eb7eb9baad96c68'

useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey)
}, [])
  const { theme } = useThemeContext()
  return (
    <ThemeContextProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme: darkTheme}>
        <GlobalStyles />
        <Dashboard permission="client" />
      </ThemeProvider>
    </ThemeContextProvider>
  );
};

export default Client;