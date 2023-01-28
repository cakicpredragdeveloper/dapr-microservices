import { memo } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import sortIcon from "../../resources/sortAsc.svg";
import sortDescIcon from "../../resources/sortDesc.svg";
import sortDefIcon from "../../resources/sortDefault.svg";
import { themeMui } from "../styles";
import { EmployeeSort } from "./table/EmployeeTable";
import { LogSort } from "./table/LogTable";

interface TableHeaderProps {
  cells: string[];
  sort?: EmployeeSort | LogSort;
  setSort?: (event: any) => void;
}

const setCursor = (label: string): boolean => label === "";

export const mapSortingOptions: { [key: string]: string } = {
  none: "none",
  EmployeeId: "EmployeeId",
  FirstName: "FirstName",
  LastName: "LastName",
  Email: "Email",
  JobTitle: "JobTitle",
  WorkingTime: "WorkingTime",
  OnDay: "OnDay",
  EntryTimestamp: "EntryTimestamp",
  ExitTimestamp: "ExitTimestamp"
};

const cell = (label: string, setSort?: (event: any) => void, sort?: EmployeeSort | LogSort) => (
  <TableCell
    id={`cell_${label}`}
    key={label}
    align={label === "" ? "right" : "left"}
    sx={{
      fontWeight: 700,
      color: "#293330",
      fontSize: "14px",
      fontFamily: "Open Sans",
      paddingTop: themeMui.spacing(2),
      paddingBottom: themeMui.spacing(2),
      paddingLeft: themeMui.spacing(0.75),
      cursor: setCursor(label) ? "default" : "pointer",
      WebkitTouchCallout: "none" /* iOS Safari */,
      WebkitUserSelect: "none" /* Safari */,
      KhtmlUserSelect: "none" /* Konqueror HTML */,
      MozUserSelect: "none" /* Old versions of Firefox */,
      msUserSelect: "none" /* Internet Explorer/Edge */,
      userSelect: "none" /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
    }}
    onClick={label === "" || setSort === undefined ? () => {} : setSort}
  >
    {!(setSort === undefined || setCursor(label)) && sort !== undefined && (
      <img
        id={`icon_${label}`}
        src={
          label === mapSortingOptions[sort.field]
            ? sort.type === "asc"
              ? sortIcon
              : sort.type === "desc"
              ? sortDescIcon
              : sortDefIcon
            : sortDefIcon
        }
        alt={label}
        height="12px"
        width="24px"
        style={{
          margin: 0,
          padding: 0,
          cursor: "pointer"
        }}
        onClick={setSort !== undefined ? setSort : () => {}}
      />
    )}
    {label}
  </TableCell>
);

const TableHeader = ({ cells, setSort, sort }: TableHeaderProps) => (
  <TableHead>
    <TableRow>{cells.map((c) => cell(c, setSort, sort))}</TableRow>
  </TableHead>
);

export default memo(TableHeader);
