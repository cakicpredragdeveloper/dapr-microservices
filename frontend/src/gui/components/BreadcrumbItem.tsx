import React from "react";
import { useNavigate } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import Typography from "@mui/material/Typography/Typography";
import Link from "@mui/material/Link/Link";

interface BreadcrumbItemProps {
  text: string;
  url: string;
  isLink: boolean;
}

const useStyles = makeStyles(() => ({
  cursor: {
    cursor: "default"
  }
}));

export default function BreadcrumbItem({ text, url, isLink }: BreadcrumbItemProps) {
  const name = `${text[0].toUpperCase()}${text.substr(1, text.length)}`;
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    navigate(url);
  };

  const labelBreadcrumb = (
    <Typography color="textPrimary" className={classes.cursor}>
      {text === "editor" ? name : text}
    </Typography>
  );

  const linkBreadCrumb = (
    <Link color="inherit" sx={{ textDecoration: "none" }} href="/" onClick={handleClick}>
      {name}
    </Link>
  );

  return !isLink ? labelBreadcrumb : linkBreadCrumb;
}
