import * as React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container/Container";
import TextField from "@mui/material/TextField/TextField";
import { themeMui } from "../styles";

interface ErrorMessageProps {
  message: string | undefined;
  handleClose?: () => {};
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        cursor: "default"
      }}
    >
      <TextField autoFocus hidden sx={{ opacity: 0, width: 0, height: 0 }} />
      <Alert
        sx={{
          marginBottom: themeMui.spacing(2)
        }}
        severity="error"
        onClose={props.handleClose}
      >
        {props.message}
      </Alert>
    </Container>
  );
}
