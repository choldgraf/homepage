import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { render } from "react-dom";
import { LoginPage } from "./loginpage";

export const theme = extendTheme({
  styles: {
    global: {
      a: {
        // Matches what JupyterHub's bootstrap theme gave us
        color: "#2c7bb6",
        _hover: {
          color: "#1d5178",
          textDecoration: "underline"
        }
      }
    }
  }
})

document.addEventListener('DOMContentLoaded', function () {
  render(
    <ChakraProvider theme={theme}>
      <LoginPage />
    </ChakraProvider>,
    document.getElementById("root")
  );
})
