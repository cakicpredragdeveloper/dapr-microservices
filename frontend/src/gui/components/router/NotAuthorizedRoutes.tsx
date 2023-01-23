import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "../Loader";
const SignInPage = React.lazy(() => import("../../page/signIn"));

export const NotAuthorizedRoutes = (
  <>
    <Route
      path="/sign-in"
      element={
        <Suspense fallback={<Loader background view />}>
          <SignInPage />
        </Suspense>
      }
    />
  </>
);
