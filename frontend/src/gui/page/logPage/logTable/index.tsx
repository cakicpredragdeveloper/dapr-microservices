import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../../components/ErrorMessage";
import { GetLogs, ResetLogListError, ResetLogListView } from "../../../redux/logList/LogListCommands";
import { SnackClose } from "../../../redux/base/BaseCommands";
import Loader from "../../../components/Loader";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const Snackbar = lazy(() => import("../../../components/SnackBar"));
const LogTable = lazy(() => import("../../../components/table/LogTable"));

export default function Logs() {
  const { error, loading } = useAppSelector((state: RootState) => state.logList);
  const { snackOpen, snackText } = useAppSelector((state: RootState) => state.base);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetLogs());

    return () => {
      dispatch(ResetLogListView());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(ResetLogListError()), 8000);
    }
  }, [dispatch, error]);

  const handleSnackBarClose = () => {
    dispatch(SnackClose());
  };

  const handleCloseError = () => dispatch(ResetLogListView());
  const errorView = <ErrorMessage message={error} handleClose={handleCloseError} />;

  const viewToRender = (
    <div>
      <Suspense fallback={<Loader />}>
        {error ? errorView : null}
        <LogTable />
        <Snackbar open={snackOpen} handleClose={handleSnackBarClose} message={snackText} />
      </Suspense>
    </div>
  );

  if (loading) return <Loader />;
  else return viewToRender;
}
