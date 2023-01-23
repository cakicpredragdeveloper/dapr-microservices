import Icon from "@mui/material/Icon/Icon";
import { memo } from "react";
import logo from "../../resources/appLogo.svg";

const AppLogo = () => (
  <Icon
    sx={{
      height: "25vh",
      width: "30vw",
      minHeight: "250px",
      minWidth: "300px",
      maxHeight: "500px",
      maxWidth: "400px"
    }}
  >
    <img
      style={{
        height: "100%",
        width: "100%"
      }}
      src={logo}
      alt="app-logo"
    />
  </Icon>
);

export default memo(AppLogo);
