import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { CheckAuth } from "../../redux/base/BaseCommands";
import { clearStorageChanged } from "../../redux/base/BaseSlice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const BASE_AUTHORIZED_ROUTE = "/app";

export default function BasePage() {
  const { signedIn, clearStorageAllowed } = useAppSelector((state: RootState) => state.base);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    dispatch(CheckAuth());
  }, [dispatch]);

  const getRedirectPath = useCallback(() => {
    const redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath && redirectPath.length > 0 && redirectPath.startsWith(BASE_AUTHORIZED_ROUTE)) {
      navigate(redirectPath);
    } else if (location.pathname === "/" || location.pathname === "/app/") {
      navigate(`${BASE_AUTHORIZED_ROUTE}/employees`);
    } else if (!location.pathname.startsWith(BASE_AUTHORIZED_ROUTE)) navigate(`${BASE_AUTHORIZED_ROUTE}/employees`);
  }, [navigate, location.pathname]);

  const redirectToSignIn = useCallback(() => {
    if (location.pathname.startsWith(BASE_AUTHORIZED_ROUTE) || location.pathname === "/") {
      if (location.pathname) {
        localStorage.setItem("redirectPath", `${location.pathname}${location.search}`);
      }

      navigate("/sign-in");

      if (clearStorageAllowed) {
        localStorage.removeItem("redirectPath");
        dispatch(clearStorageChanged(false));
      }
    }
  }, [location, navigate, clearStorageAllowed, dispatch]);

  useEffect(() => {
    if (signedIn) {
      getRedirectPath();
    } else {
      redirectToSignIn();
    }
  }, [signedIn, redirectToSignIn, getRedirectPath]);

  return <div>{/* THIS IS NOT A PLACE FOR ANY UI*/}</div>;
}
