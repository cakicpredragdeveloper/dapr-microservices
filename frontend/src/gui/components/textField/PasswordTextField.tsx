import { memo, useState } from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordTextFieldProps {
  value: string;
  error: boolean;
  onChangeInputs: (event: any) => void;
}

const PasswordTextField = ({ value, error, onChangeInputs }: PasswordTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <FormControl
      fullWidth
      sx={(theme) => ({
        margin: theme.spacing(0.7, 0)
      })}
      variant="outlined"
    >
      <InputLabel id="password-label">password</InputLabel>
      <OutlinedInput
        name="password"
        type={showPassword ? "text" : "password"}
        label="password"
        aria-labelledby="password-label"
        aria-label="password-label"
        id="password"
        autoComplete="password"
        value={value}
        endAdornment={
          <InputAdornment position="end" aria-labelledby="password-label">
            <IconButton
              aria-label="icon-button"
              aria-labelledby="password-label"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={onChangeInputs}
        error={error}
      />
    </FormControl>
  );
};

export default memo(PasswordTextField);
