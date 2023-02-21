import { ThemeOptions } from "@mui/material";

export const customTheme = (darkmode: boolean): ThemeOptions => {
  return {
    palette: {
      mode: darkmode ? "dark" : "light",
      primary: { main: "#40b6c3", contrastText: "#f1f1f1" },
    },
    typography: {
      fontFamily: [
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  };
};
