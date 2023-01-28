import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GetEmployee, ResetEmployeeView } from "../../../redux/employee/EmployeeCommands";
import { Card, Grid, Typography } from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage";
import Loader from "../../../components/Loader";
import EmployeeInfo from "./EmployeeInfo";
import LogsInfo from "./LogsInfo";

const sideView = (view: JSX.Element) => (
  <Grid item xs={6}>
    {view}
  </Grid>
);

const content = (
  <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
    {sideView(<EmployeeInfo />)}
    {sideView(<LogsInfo />)}
  </Grid>
);

const viewToRender = (
  <Card sx={(theme) => ({ margin: theme.spacing(1, 0), padding: theme.spacing(1.5, 0) })}>
    <Typography variant="h4" sx={{ textAlign: "center" }}>
      Employee Info
    </Typography>
    {content}
  </Card>
);

export default function Employee() {
  const { error, loading } = useAppSelector((state: RootState) => state.employee);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const routeParts = location.pathname.split("/");
    const employeeId = routeParts[3];

    dispatch(GetEmployee(employeeId));
  }, [dispatch, location]);

  useEffect(() => {
    return () => {
      dispatch(ResetEmployeeView());
    };
  }, [dispatch]);

  return error ? <ErrorMessage message="testing" /> : loading ? <Loader /> : viewToRender;
}
