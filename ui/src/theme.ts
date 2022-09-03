import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rbga(0, 0, 0, 0)",
    },
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    error: {
      main: "#f44336",
    },
  },
});

export default theme;
