import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BasePage from "../../page/basePage/BasePage";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

import Loader from "../Loader";
import { NotAuthorizedRoutes } from "./NotAuthorizedRoutes";
const AuthorizedRoutes = lazy(() => import("./AuthorizedRoutes"));

export default function AppRouter() {
  const { signedIn } = useAppSelector((state: RootState) => ({
    signedIn: state.base.signedIn
  }));

  const routes = signedIn ? (
    <Route
      path="app/*"
      element={
        <Suspense fallback={<Loader view />}>
          <AuthorizedRoutes />
        </Suspense>
      }
    />
  ) : (
    NotAuthorizedRoutes
  );

  return (
    <Router>
      <Routes>
        <Route path="*" element={<BasePage />} />
        {routes}
      </Routes>
    </Router>
  );
}
