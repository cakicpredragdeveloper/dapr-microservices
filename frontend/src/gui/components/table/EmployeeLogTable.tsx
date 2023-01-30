import React, { useCallback, useEffect, useState } from "react";
import { LogViewModel } from "../../presenter/logPresenter/viewModel/LogViewModel";
import { useAppSelector } from "../../redux/hooks";
import { checkValue, sortValues } from "./resources";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Card from "@mui/material/Card/Card";
import Table from "@mui/material/Table/Table";
import TableHeader, { mapSortingOptions } from "../TableHeader";
import TableBody from "@mui/material/TableBody/TableBody";
import TableFooter from "@mui/material/TableFooter/TableFooter";
import TableRow from "@mui/material/TableRow/TableRow";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import { RootState } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import { LogFieldType, LogSort, tableCell } from "./LogTable";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function EmployeeLogTable() {
  const { logs } = useAppSelector((state: RootState) => ({
    logs: state.employee.employee.logs
  }));

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const [filteredData, setFilteredData] = React.useState<LogViewModel[]>([]);
  const [displayData, setDisplayData] = React.useState<LogViewModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort: LogSort = {
    type: searchParams.get("sortType") !== null ? (searchParams.get("sortType") as "none" | "asc" | "desc") : "none",
    field: searchParams.get("sortField") !== null ? (searchParams.get("sortField") as "none" | LogFieldType) : "none"
  };

  const checkFilter = useCallback(
    () =>
      checkValue(searchParams.get("search")) &&
      checkValue(searchParams.get("sortType")) &&
      checkValue(searchParams.get("sortField")),
    [searchParams]
  );

  const handleSort = useCallback(
    (searchList: LogViewModel[]) => {
      const sortType = searchParams.get("sortType");
      const sortField = searchParams.get("sortField");

      let newList = searchList;

      if (sortType !== null && sortField !== null && sortType !== "none" && sortField !== "none") {
        newList = [...searchList].sort((log1, log2) => {
          return sortValues(log1[sortField as LogFieldType], log2[sortField as LogFieldType], sortType);
        });
      }

      return newList;
    },
    [searchParams]
  );

  useEffect(() => {
    if (checkFilter()) {
      setFilteredData(logs);
    } else {
      setFilteredData(handleSort(logs));
    }
  }, [logs, handleSort, checkFilter]);

  useEffect(() => {
    setDisplayData(
      filteredData.filter((_log, ind) => ind >= pageNumber * pageSize && ind < (pageNumber + 1) * pageSize)
    );
  }, [filteredData, pageNumber, pageSize]);

  const row = (log: LogViewModel, ind?: number) => (
    <TableRow key={`${log.EmployeeId}-${ind}`} id={`${log.EmployeeId}`}>
      {tableCell(log.EmployeeId, log.WorkingTime, "33%")}
      {tableCell(log.EmployeeId, log.EntryTimestamp, "33%")}
      {tableCell(log.EmployeeId, log.ExitTimestamp, "33%")}
    </TableRow>
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const sorting = (event: any) => {
    const id = event.currentTarget.id.split("_");
    const option = mapSortingOptions[id[1]];

    const currType = searchParams.get("sortType");
    const currField = searchParams.get("sortField");

    if (option === "WorkingTime" || option === "EntryTimestamp" || option === "ExitTimestamp") {
      const sortType =
        option !== currField ? "asc" : currType === "desc" ? "none" : currType === "asc" ? "desc" : "asc";

      sortType === "none" ? searchParams.delete("sortType") : searchParams.set("sortType", sortType);

      const sortField = currField === option && currType === "desc" ? "none" : option;

      sortField === "none" ? searchParams.delete("sortField") : searchParams.set("sortField", sortField);

      const searchText = searchParams.get("search");
      if (searchText !== null) searchParams.set("search", searchText);
      setSearchParams(searchParams);
    }
  };

  const content =
    filteredData.length > 0 ? (
      <TableContainer component={Card} sx={{ marginBottom: 2, blog: "1px solid #DFE0EB", blogRadius: "8px" }}>
        <Table aria-label="logs-table" size="small">
          <TableHeader cells={["WorkingTime", "EntryTimestamp", "ExitTimestamp"]} setSort={sorting} sort={sort} />
          <TableBody>{displayData.map((log, ind) => row(log, ind))}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                count={filteredData.length}
                rowsPerPage={pageSize}
                page={pageNumber}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    ) : (
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        No data to display
      </Typography>
    );

  const viewToRender = (
    <Container disableGutters>
      <Typography variant="h5" sx={(theme) => ({ textAlign: "center", margin: theme.spacing(2, 0) })}>
        Logs
      </Typography>
      {content}
    </Container>
  );
  return viewToRender;
}
