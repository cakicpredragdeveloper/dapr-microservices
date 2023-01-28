import makeStyles from "@mui/styles/makeStyles/makeStyles";
import { Theme } from "@mui/material/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((themeMui: Theme) => ({
  root: {
    display: "flex"
  },
  menuButton: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5,
    color: "#FFFFFF"
  },
  signOutButton: {
    marginLeft: themeMui.spacing(1),
    color: "#000000",
    border: "1.5px solid #DFE0EB",
    background: "transparent"
  },
  menuListItem: {
    marginLeft: 4
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    backgroundColor: "#40454E",
    width: drawerWidth,
    overflowX: "hidden",
    transition: themeMui.transitions.create("width", {
      easing: themeMui.transitions.easing.sharp,
      duration: themeMui.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: "#40454E",
    transition: themeMui.transitions.create("width", {
      easing: themeMui.transitions.easing.sharp,
      duration: themeMui.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 70,
    [themeMui.breakpoints.up("sm")]: {
      width: themeMui.spacing(9) + 1
    }
  },
  content: {
    flexGrow: 1,
    margin: themeMui.spacing(0, 2)
  },
  error: {
    width: themeMui.spacing(25),
    margin: "auto"
  },
  imageIcon: {
    height: "40px"
  },
  imageProfile: {
    minHeight: "2.5vh",
    minWidth: "3vw"
  },
  signOutIcon: {
    minHeight: "2vh",
    minWidth: "2vw"
  },
  toolbar: {
    backgroundColor: "#40454E",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: themeMui.spacing(2, 0, 3),
    // necessary for content to be below app bar
    ...themeMui.mixins.toolbar,
    cursor: "default"
  },
  appBar: {
    position: "sticky",
    zIndex: 1,
    top: 0,
    marginBottom: themeMui.spacing(2),
    backgroundColor: "#fefbf9",
    padding: themeMui.spacing(0.8, 0, 0)
  },
  drawerCloseButton: {
    color: "#F2F2F2",
    padding: 0
  },
  list: {
    backgroundColor: "#40454E"
  },
  title: {
    color: "#293330",
    cursor: "default"
  },
  profileDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "default",
    float: "right"
  },
  profileLabel: {
    color: "#252733",
    fontWeight: 400,
    fontSize: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "default"
  },
  divider: {
    margin: themeMui.spacing(0.8, 0, 0)
  },
  settingsLabel: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 600,
    marginLeft: themeMui.spacing(0.5)
  },
  settingsIcon: {
    cursor: "pointer"
  },
  utilityLabel: {
    fontFamily: "Open Sans",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 2,
    "&:hover": { cursor: "default" }
  }
}));
