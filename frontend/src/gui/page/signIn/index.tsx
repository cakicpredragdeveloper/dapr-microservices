import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import StandardTextField from "../../components/textField/StandardTextField";
import PasswordTextField from "../../components/textField/PasswordTextField";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { themeMui } from "../../styles";
import { useAppSelector } from "../../redux/hooks";
import ErrorMessage from "../../components/ErrorMessage";
import CustomLoadingButton from "../../components/CustomLoadingButton";
import SnackBar from "../../components/SnackBar";
import AppLogo from "../../components/AppLogo";
import { SnackClose } from "../../redux/base/BaseCommands";
import { ChangeSignInInputs, SignInCommand } from "../../redux/signIn/SignInCommands";

const titleView = (
  <Container
    disableGutters
    sx={{
      margin: themeMui.spacing(1, 0, 2.5)
    }}
  >
    <AppLogo />
  </Container>
);

export default function SignIn() {
  const dispatch = useDispatch();

  const { state, snackOpen, snackText } = useAppSelector((state: RootState) => ({
    state: state.signIn,
    snackOpen: state.base.snackOpen,
    snackText: state.base.snackText
  }));

  const [formControl, setFormControl] = useState({
    email: false,
    password: false
  });

  const handleSnackClose = () => {
    dispatch(SnackClose());
  };

  const onChangeInputs = (event: any) => {
    setFormControl({
      ...formControl,
      [event.target.name]: false
    });
    dispatch(ChangeSignInInputs({ field: event.target.name, value: event.target.value.trim() }));
  };

  const onSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.email && state.password) {
      dispatch(SignInCommand());
    } else {
      setFormControl({
        email: !state.email ? true : false,
        password: !state.password ? true : false
      });
    }
  };

  const errorView = <>{state.error && <ErrorMessage message={state.error} />}</>;

  const formView = (
    <form
      style={{
        width: "100%" // Fix IE 11 issue.
      }}
      noValidate
      onSubmit={onSignIn}
    >
      <StandardTextField value={state.email} error={formControl.email} onChangeInputs={onChangeInputs} />
      <PasswordTextField value={state.password} error={formControl.password} onChangeInputs={onChangeInputs} />
      <CustomLoadingButton text="Log in" loading={state.loading} />
    </form>
  );

  const viewToRender = (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#40454E",
        height: "100%",
        width: "100%",
        position: "absolute",
        overflowY: "hidden"
      }}
    >
      <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
        <Container
          sx={{
            backgroundColor: "#fefbf9",
            marginTop: "10vh",
            padding: themeMui.spacing(3, 3),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "8px",
            cursor: "default"
          }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />

          {titleView}
          {errorView}

          {formView}
          <SnackBar open={snackOpen} handleClose={handleSnackClose} message={snackText} />
        </Container>
      </Grid>
    </Container>
  );

  return viewToRender;
}
