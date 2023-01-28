import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import React from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import BreadcrumbItem from "./BreadcrumbItem";

const makeUrlFromPathList = (paths: string[], endIndex: number) => {
  let result = "/app";
  paths.forEach((path, index) => {
    if (index > endIndex) return;
    if (path.indexOf(" ") !== -1) {
      path = path.replace(" ", "-");
    }
    result += `/${path}`;
  });
  return result;
};

const makeBreadcrumbsObjects = (pathname: string): MenuItemObject[] => {
  const pathList = pathname
    .replace("app", "")
    .split("/")
    .filter((p) => p.length > 0);
  return pathList.map((p, index) => ({
    title: p,
    url: makeUrlFromPathList(pathList, index)
  }));
};

interface MenuItemObject {
  title: string;
  url: string;
}

export default function AppBreadcrumbs() {
  const { pathname } = useLocation();
  const [paths, setPaths] = React.useState<MenuItemObject[]>([]);

  React.useEffect(() => {
    const list = makeBreadcrumbsObjects(pathname);
    setPaths(list.length > 1 ? list : []);
  }, [setPaths, pathname]);

  const breadcrumbsView =
    paths.length > 0 ? (
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {paths.map((pObject, index) => (
          <BreadcrumbItem
            key={index}
            isLink={index !== paths.length - 1}
            text={pObject.title}
            url={pObject.url}
          />
        ))}
      </Breadcrumbs>
    ) : null;

  return (
    <>
      {breadcrumbsView}
      <Outlet />
    </>
  );
}
