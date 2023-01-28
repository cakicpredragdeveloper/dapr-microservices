import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  GetEmployees,
  ResetEmployeeListError,
  ResetEmployeeListView
} from "../../../redux/employeeList/EmployeeListCommands";
import { SnackClose } from "../../../redux/base/BaseCommands";
import Loader from "../../../components/Loader";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const Snackbar = lazy(() => import("../../../components/SnackBar"));
const EmployeeTable = lazy(() => import("../../../components/table/EmployeeTable"));

export default function Employees() {
  const { error, loading } = useAppSelector((state: RootState) => state.employeeList);
  const { snackOpen, snackText } = useAppSelector((state: RootState) => state.base);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(GetEmployees());

    return () => {
      dispatch(ResetEmployeeListView());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(ResetEmployeeListError()), 8000);
    }
  }, [dispatch, error]);

  const handleSnackBarClose = () => {
    dispatch(SnackClose());
  };

  const handleEdit = (event: any) => {
    const employeeNumber = event.currentTarget.id;
    if (employeeNumber) navigate(`${location.pathname}/${employeeNumber}`);
  };

  const handleCloseError = () => dispatch(ResetEmployeeListView());
  const errorView = <ErrorMessage message={error} handleClose={handleCloseError} />;

  const viewToRender = (
    <div>
      <Suspense fallback={<Loader />}>
        {error ? errorView : null}
        <EmployeeTable handleEdit={handleEdit} />
        <Snackbar open={snackOpen} handleClose={handleSnackBarClose} message={snackText} />
      </Suspense>
    </div>
  );

  if (loading) return <Loader />;
  else return viewToRender;
}
