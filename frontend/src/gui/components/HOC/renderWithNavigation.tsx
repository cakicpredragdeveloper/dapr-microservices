import React from "react";
import clsx from "clsx";
import SidebarMenuItem from "../MenuItem";
import { useLocation } from "react-router";
// import { SignOutAction } from "../../redux/signOut/SignOutCommands";
import { RootState } from "../../redux/store";
import ErrorMessage from "../ErrorMessage";
import { useStyles } from "./styles";
import { useSearchParams } from "react-router-dom";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import IconButton from "@mui/material/IconButton/IconButton";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Drawer from "@mui/material/Drawer/Drawer";
import Divider from "@mui/material/Divider/Divider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import SignOutIcon from "@mui/icons-material/ExitToApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useTheme from "@mui/material/styles/useTheme";
import Container from "@mui/material/Container/Container";
import TextField from "@mui/material/TextField/TextField";
import Search from "@mui/icons-material/Search";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { SetEmployeePageNumber } from "../../redux/employeeList/EmployeeListCommands";
import { SignOutAction } from "../../redux/signOut/SignOutCommands";
import appLogo from "../../../resources/appLogo.svg";

const MENU_ITEMS = [{ title: "EMPLOYEES", url: "/app/employees" }];

const isSidebarMenuItemSelected = (pathname: string, SidebarMenuItemUrl: string): boolean => {
  return SidebarMenuItemUrl === "/employees"
    ? pathname === SidebarMenuItemUrl
    : pathname.indexOf(SidebarMenuItemUrl) === 0;
};

const getTitleForPage = (pathname: string): string => {
  const parts = pathname.split("/").filter((i) => i.length > 0);
  if (parts.length > 1) return `${parts[1][0].toUpperCase()}${parts[1].substr(1, parts[1].length)}`;
  return "Employee Dashboard";
};

export default function renderWithNavigation(WrappedComponent: React.ComponentType<any>) {
  return () => {
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState("Employee Dashboard");
    const [showSearchBar, setShowSearchBar] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const menuOpen = Boolean(anchorEl);

    const searchText = searchParams.get("search") !== null ? searchParams.get("search") : "";

    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const signOutError = useAppSelector((state: RootState) => state.signOut.error);

    React.useEffect(() => {
      const paths = pathname.split("/");
      setShowSearchBar(paths[paths.length - 1] === "employees");
      setTitle(getTitleForPage(pathname));
    }, [pathname, setTitle]);

    React.useEffect(() => {
      if (searchText === "") {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }
    }, [searchParams, searchText, setSearchParams]);

    const onSignOut = () => {
      dispatch(SignOutAction());
    };

    const handleMenuClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const dropdownMenu = (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        ref={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "menu-button"
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5
          }
        }}
      >
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <SignOutIcon className={classes.signOutIcon} />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    );

    const menuIcon = (
      <IconButton
        id="menu-button"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuClick}
        edge="end"
        size="small"
        className={classes.signOutButton}
      >
        <img height="30em" width="30em" src={appLogo} alt="appLogo" />
      </IconButton>
    );

    const renderDrawer = (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <Container disableGutters maxWidth={false}>
          {open && (
            <div className={classes.toolbar}>
              <img height="42em" width="39em" src={appLogo} alt="appLogo" />
              <Typography component="label" variant="caption">
                Employee <br />
                Dashboard <br />
              </Typography>

              <IconButton color="default" onClick={handleDrawerClose} className={classes.drawerCloseButton}>
                {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
          )}
        </Container>
        <List className={classes.list}>
          <ListItem
            key="menu"
            className={clsx(classes.menuListItem, {
              [classes.hide]: open
            })}
          >
            <IconButton aria-label="open drawer" className={classes.menuButton} onClick={handleDrawerOpen} edge="start">
              <img height="30em" width="30em" src={appLogo} alt="appLogo" />
            </IconButton>
          </ListItem>
          {MENU_ITEMS.map(({ title, url }, index) => (
            <SidebarMenuItem title={title} url={url} key={index} selected={isSidebarMenuItemSelected(pathname, url)} />
          ))}
        </List>
      </Drawer>
    );

    const setSearch = (event: any) => {
      const search = event.currentTarget.value;
      if (searchText !== search) {
        const sortType = searchParams.get("sortType");
        const sortField = searchParams.get("sortField");

        searchParams.set("search", search);
        if (sortType !== null) searchParams.set("sortType", sortType);
        if (sortField !== null) searchParams.set("sortField", sortField);

        setSearchParams(searchParams);
        dispatch(SetEmployeePageNumber(0));
      }
    };

    const renderAppBar = (
      <div className={classes.appBar}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={showSearchBar ? 4 : 5} sm={showSearchBar ? 3.2 : 5} md={showSearchBar ? 3.5 : 3} lg={3} xl={2}>
            <Typography variant="h5" className={classes.title} noWrap>
              {title}
            </Typography>
          </Grid>

          {showSearchBar && (
            <Grid item xs={6} sm={5} md={3.8} lg={5} xl={5}>
              <TextField
                size="small"
                placeholder={`Search ${title.toLocaleLowerCase()}`}
                sx={{
                  fontSize: "16px",
                  padding: 0,
                  margin: 0,
                  color: "#293330",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 20px rgba(0, 0, 0, 0.08)"
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <Search
                        sx={{
                          color: "#C5C7CD",
                          height: "30vh",
                          width: "30vh",
                          minHeight: "13px",
                          minWidth: "13px",
                          maxHeight: "26px",
                          maxWidth: "26px"
                        }}
                      />
                    </IconButton>
                  )
                }}
                value={searchText}
                onChange={setSearch}
              />
            </Grid>
          )}
          <Grid item xs={showSearchBar ? 2 : 5} sm={showSearchBar ? 1.5 : 4} md={showSearchBar ? 3.5 : 2} lg={2} xl={2}>
            <div className={classes.profileDiv}>
              <Typography
                sx={{
                  color: {
                    xs: showSearchBar ? "#fefbf9" : "#252733",
                    sm: showSearchBar ? "#fefbf9" : "#252733",
                    md: "#252733",
                    lg: "#252733",
                    xl: "#252733"
                  },
                  fontWeight: 400,
                  fontSize: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  cursor: "default"
                }}
                noWrap
              >
                Admin
              </Typography>

              {menuIcon}
              {dropdownMenu}
            </div>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="fullWidth" className={classes.divider} />
          </Grid>
        </Grid>
      </div>
    );

    const renderError = <div className={classes.error}>{signOutError && <ErrorMessage message={signOutError} />}</div>;

    const renderContent = (
      <main className={classes.content}>
        {renderAppBar}
        {renderError}
        <WrappedComponent />
      </main>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        {renderDrawer}
        {renderContent}
      </div>
    );
  };
}
