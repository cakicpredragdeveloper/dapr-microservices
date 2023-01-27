import { Outlet, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Employee from "../../page/employee/employee";
import Employees from "../../page/employee/employeeTable";
import Logs from "../../page/logPage/logTable";
import NotFound from "../../page/notFound";
import AppBreadcrumbs from "../AppBreadcrumbs";
import renderWithNavigation from "../HOC/renderWithNavigation";

function AuthorizedRoutes() {
  return (
    <Routes>
      <Route element={<AppBreadcrumbs />}>
        <Route path="employees" element={<Outlet />}>
          <Route index element={<Employees />} />
          <Route path=":employeeId" element={<Employee />} />
        </Route>
        <Route path="logs" element={<Outlet />}>
          <Route index element={<Logs />} />
          {/* <Route path=":id" element={<Log />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default renderWithNavigation(AuthorizedRoutes);
