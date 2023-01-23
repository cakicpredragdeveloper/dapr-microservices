import TextField from "@mui/material/TextField/TextField";
import { memo } from "react";

interface StandardTextFieldProps {
  value: string;
  error: boolean;
  onChangeInputs: (event: any) => void;
}

const StandardTextField = ({ value, error, onChangeInputs }: StandardTextFieldProps) => (
  <TextField
    id="email"
    variant="outlined"
    label="email"
    name="email"
    sx={(theme) => ({
      margin: theme.spacing(0.7, 0)
    })}
    autoComplete="email"
    autoFocus
    value={value}
    onChange={onChangeInputs}
    error={error}
  />
);

export default memo(StandardTextField);
