import Alert from "@mui/material/Alert/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import React from "react";

interface SnackbarProps {
  open: boolean;
  message: string;
  handleClose: () => void;
}

export default function SnackBar(props: SnackbarProps) {
  const { open, message, handleClose } = props;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert icon={false} onClose={handleClose} sx={{ backgroundColor: "#2cdea8", color: "#ffffff" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
