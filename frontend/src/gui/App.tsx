import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AppRouter from "./components/router/AppRouter";
import { themeMui } from "./styles";
import "./App.css";
import Container from "@mui/material/Container/Container";

const App = () => (
  <Container maxWidth={false} disableGutters className="App">
    <ThemeProvider theme={themeMui}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          margin: themeMui.spacing(0),
          padding: themeMui.spacing(0),
          overflowX: "hidden",
          height: "100vh",
          width: "100vw",
          background: "#fefbf9"
        }}
      >
        <AppRouter />
      </Container>
    </ThemeProvider>
  </Container>
);

export default App;
