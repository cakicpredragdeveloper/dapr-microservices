import React, { useCallback, useEffect } from "react";
import { LogViewModel } from "../../presenter/logPresenter/viewModel/LogViewModel";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { checkValue, searchFilter, sortValues } from "./resources";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Card from "@mui/material/Card/Card";
import Table from "@mui/material/Table/Table";
import TableHeader from "../TableHeader";
import TableBody from "@mui/material/TableBody/TableBody";
import TableFooter from "@mui/material/TableFooter/TableFooter";
import TableRow from "@mui/material/TableRow/TableRow";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import { themeMui } from "../../styles";
import { RootState } from "../../redux/store";
import { SetLogPageNumber, SetLogPageSize } from "../../redux/logList/LogListCommands";
import { useSearchParams } from "react-router-dom";
import TableCell from "@mui/material/TableCell/TableCell";

const mapSortingOptions: { [key: string]: string } = {
  none: "none",
  WorkingTime: "WorkingTime",
  OnDay: "OnDay",
  EntryTimestamp: "EntryTimestamp",
  ExitTimestamp: "ExitTimestamp",
  EmployeeId: "EmployeeId"
};

export type LogFieldType = "WorkingTime" | "OnDay" | "EntryTimestamp" | "ExitTimestamp" | "EmployeeId";

export const tableCell = (id: string, label: string, width: string, handleRedirect?: (event: any) => void) => (
  <TableCell
    id={id}
    align="left"
    sx={{
      color: "#252733",
      fontWeight: 400,
      size: "12px",
      padding: themeMui.spacing(2, 0),
      paddingLeft: themeMui.spacing(1.5),
      wordBreak: "break-all",
      fontSize: 12,
      cursor: handleRedirect !== undefined ? "pointer" : "default",
      width
    }}
    onClick={handleRedirect !== undefined ? handleRedirect : () => {}}
  >
    {label}
  </TableCell>
);

export const tableCellButtons = (content: JSX.Element, width: string) => (
  <TableCell
    align="right"
    sx={{
      width
    }}
  >
    {content}
  </TableCell>
);

export type LogSort = {
  type: "none" | "asc" | "desc";
  field: "none" | LogFieldType;
};

export default function LogsTable() {
  const { logList, pageSize, pageNumber } = useAppSelector((state: RootState) => state.logList);

  const [filteredData, setFilteredData] = React.useState<LogViewModel[]>([]);
  const [displayData, setDisplayData] = React.useState<LogViewModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort: LogSort = {
    type: searchParams.get("sortType") !== null ? (searchParams.get("sortType") as "none" | "asc" | "desc") : "none",
    field: searchParams.get("sortField") !== null ? (searchParams.get("sortField") as "none" | LogFieldType) : "none"
  };

  const dispatch = useDispatch();

  const checkFilter = useCallback(
    () =>
      checkValue(searchParams.get("search")) &&
      checkValue(searchParams.get("sortType")) &&
      checkValue(searchParams.get("sortField")),
    [searchParams]
  );

  const handleSearch = useCallback(() => {
    const tableSearchText = searchParams.get("search");

    let searchList: LogViewModel[] = logList;

    if (tableSearchText !== null && tableSearchText !== "") {
      const search = tableSearchText.toLocaleLowerCase();
      searchList = logList.filter(
        (log) =>
          searchFilter(log.WorkingTime, search) ||
          searchFilter(log.OnDay, search) ||
          searchFilter(log.EntryTimestamp, search) ||
          searchFilter(log.ExitTimestamp, search) ||
          searchFilter(log.EmployeeId, search)
      );
    }

    return searchList;
  }, [logList, searchParams]);

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
      setFilteredData(logList);
    } else {
      const result: LogViewModel[] = handleSearch();
      setFilteredData(handleSort(result));
    }
  }, [logList, handleSearch, handleSort, checkFilter]);

  useEffect(() => {
    setDisplayData(
      filteredData.filter((_log, ind) => ind >= pageNumber * pageSize && ind < (pageNumber + 1) * pageSize)
    );
  }, [filteredData, pageNumber, pageSize]);

  const row = (log: LogViewModel, ind?: number) => (
    <TableRow key={`${log.EmployeeId}-${ind}`} id={`${log.EmployeeId}`}>
      {tableCell(log.EmployeeId, log.WorkingTime, "20%")}
      {tableCell(log.EmployeeId, log.OnDay, "20%")}
      {tableCell(log.EmployeeId, log.EntryTimestamp, "20%")}
      {tableCell(log.EmployeeId, log.ExitTimestamp, "20%")}
      {tableCell(log.EmployeeId, log.EmployeeId, "20%")}
    </TableRow>
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(SetLogPageNumber(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetLogPageSize(parseInt(event.target.value, 10)));
    dispatch(SetLogPageNumber(0));
  };

  const sorting = (event: any) => {
    const id = event.currentTarget.id.split("_");
    const option = mapSortingOptions[id[1]];

    const currType = searchParams.get("sortType");
    const currField = searchParams.get("sortField");

    if (
      option === "WorkingTime" ||
      option === "OnDay" ||
      option === "EntryTimestamp" ||
      option === "ExitTimestamp" ||
      option === "EmployeeId"
    ) {
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

  return (
    <TableContainer component={Card} sx={{ marginBottom: 2, blog: "1px solid #DFE0EB", blogRadius: "8px" }}>
      <Table aria-label="logs-table" size="small">
        <TableHeader
          cells={["WorkingTime", "OnDay", "EntryTimestamp", "ExitTimestamp", "EmployeeId"]}
          setSort={sorting}
          sort={sort}
        />
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
  );
}
