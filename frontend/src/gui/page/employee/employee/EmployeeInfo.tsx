import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const labelView = (value: string, label: string) => (
  <Grid item>
    <Typography
      variant="h6"
      sx={(theme) => ({
        textAlign: "center",
        fontWeight: "bold",
        margin: theme.spacing(0, 0, 2)
      })}
    >
      {label}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        textAlign: "center"
      }}
    >
      {value}
    </Typography>
  </Grid>
);

export default function EmployeeInfo() {
  const { EmployeeId, FirstName, LastName, Email } = useAppSelector((state: RootState) => state.employee.employee);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={(theme) => ({
        margin: theme.spacing(3, 0)
      })}
    >
      {labelView(EmployeeId, "ID")}
      {labelView(FirstName, "First Name")}
      {labelView(LastName, "Last Name")}
      {labelView(Email, "Email")}
    </Grid>
  );
}
