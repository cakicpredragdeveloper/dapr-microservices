import { LogViewModel } from "../../logPresenter/viewModel/LogViewModel";

export type EmployeeInfoViewModel = {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  JobTitle: string;
  logs: LogViewModel[];
};
