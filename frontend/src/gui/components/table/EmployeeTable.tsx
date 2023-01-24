import React, { useCallback, useEffect } from "react";
import { EmployeeViewModel } from "../../presenter/employee/viewModel/EmployeeViewModel";
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
import IconButton from "@mui/material/IconButton/IconButton";
import { RootState } from "../../redux/store";
import { SetEmployeePageNumber, SetEmployeePageSize } from "../../redux/employeeList/EmployeeListCommands";
import { useSearchParams } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import TableCell from "@mui/material/TableCell/TableCell";

const mapSortingOptions: { [key: string]: string } = {
  none: "none",
  EmployeeId: "EmployeeId",
  FirstName: "FirstName",
  LastName: "LastName",
  Email: "Email",
  JobTitle: "JobTitle"
};

type EmployeeFieldType = "EmployeeId" | "FirstName" | "LastName" | "Email" | "JobTitle";

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

export type EmployeeSort = {
  type: "none" | "asc" | "desc";
  field: "none" | EmployeeFieldType;
};

interface EmployeesTableProps {
  handleEdit: (event: any) => void;
}

export default function EmployeesTable(props: EmployeesTableProps) {
  const { handleEdit } = props;
  const { employeeList, pageSize, pageNumber } = useAppSelector((state: RootState) => state.employeeList);

  const [filteredData, setFilteredData] = React.useState<EmployeeViewModel[]>([]);
  const [displayData, setDisplayData] = React.useState<EmployeeViewModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort: EmployeeSort = {
    type: searchParams.get("sortType") !== null ? (searchParams.get("sortType") as "none" | "asc" | "desc") : "none",
    field:
      searchParams.get("sortField") !== null ? (searchParams.get("sortField") as "none" | EmployeeFieldType) : "none"
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

    let searchList: EmployeeViewModel[] = employeeList;

    if (tableSearchText !== null && tableSearchText !== "") {
      const search = tableSearchText.toLocaleLowerCase();
      searchList = employeeList.filter(
        (employee) =>
          searchFilter(employee.EmployeeId, search) ||
          searchFilter(employee.FirstName, search) ||
          searchFilter(employee.LastName, search) ||
          searchFilter(employee.Email, search) ||
          searchFilter(employee.JobTitle, search)
      );
    }

    return searchList;
  }, [employeeList, searchParams]);

  const handleSort = useCallback(
    (searchList: EmployeeViewModel[]) => {
      const sortType = searchParams.get("sortType");
      const sortField = searchParams.get("sortField");

      let newList = searchList;

      if (sortType !== null && sortField !== null && sortType !== "none" && sortField !== "none") {
        newList = [...searchList].sort((employee1, employee2) => {
          return sortValues(
            employee1[sortField as EmployeeFieldType],
            employee2[sortField as EmployeeFieldType],
            sortType
          );
        });
      }

      return newList;
    },
    [searchParams]
  );

  useEffect(() => {
    if (checkFilter()) {
      setFilteredData(employeeList);
    } else {
      const result: EmployeeViewModel[] = handleSearch();
      setFilteredData(handleSort(result));
    }
  }, [employeeList, handleSearch, handleSort, checkFilter]);

  useEffect(() => {
    setDisplayData(
      filteredData.filter((_employee, ind) => ind >= pageNumber * pageSize && ind < (pageNumber + 1) * pageSize)
    );
  }, [filteredData, pageNumber, pageSize]);

  const row = (employee: EmployeeViewModel) => (
    <TableRow key={employee.EmployeeId} id={employee.EmployeeId}>
      {tableCell(employee.EmployeeId, employee.EmployeeId, "30%", handleEdit)}
      {tableCell(employee.EmployeeId, employee.FirstName, "14%", handleEdit)}
      {tableCell(employee.EmployeeId, employee.LastName, "14%", handleEdit)}
      {tableCell(employee.EmployeeId, employee.Email, "17%", handleEdit)}
      {tableCell(employee.EmployeeId, employee.JobTitle, "17%", handleEdit)}
      {tableCellButtons(
        <IconButton
          disableRipple
          id={employee.EmployeeId}
          onClick={handleEdit}
          edge="end"
          size="small"
          sx={{
            color: "#000000",
            background: "transparent"
          }}
        >
          <Edit />
        </IconButton>,
        "4%"
      )}
    </TableRow>
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(SetEmployeePageNumber(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetEmployeePageSize(parseInt(event.target.value, 10)));
    dispatch(SetEmployeePageNumber(0));
  };

  const sorting = (event: any) => {
    const id = event.currentTarget.id.split("_");
    const option = mapSortingOptions[id[1]];

    const currType = searchParams.get("sortType");
    const currField = searchParams.get("sortField");

    if (
      option === "EmployeeId" ||
      option === "FirstName" ||
      option === "LastName" ||
      option === "Email" ||
      option === "JobTitle"
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
    <TableContainer component={Card} sx={{ marginBottom: 2, bemployee: "1px solid #DFE0EB", bemployeeRadius: "8px" }}>
      <Table aria-label="employees-table" size="small">
        <TableHeader
          cells={["EmployeeId", "FirstName", "LastName", "Email", "JobTitle", ""]}
          setSort={sorting}
          sort={sort}
        />
        <TableBody>{displayData.map((employee) => row(employee))}</TableBody>
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
