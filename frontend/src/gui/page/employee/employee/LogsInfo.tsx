import { Container } from "@mui/material";
import EmployeeLogTable from "../../../components/table/EmployeeLogTable";

export default function LogsInfo() {
  return (
    <Container
      disableGutters
      sx={(theme) => ({
        margin: theme.spacing(5, 0)
      })}
    >
      <EmployeeLogTable />
    </Container>
  );
}
