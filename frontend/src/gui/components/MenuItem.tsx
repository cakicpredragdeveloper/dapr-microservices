import Mail from "@mui/icons-material/Mail";
import { useNavigate } from "react-router";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { Person2 } from "@mui/icons-material";

interface MenuItemProps {
  title: string;
  url: string;
  selected: boolean;
}

const findIcon = (name: string, selected: boolean) => {
  let result;
  switch (name) {
    case "EMPLOYEES":
      result = (
        <Person2
          sx={(theme) => ({
            color: selected ? theme.palette.primary.main : theme.palette.secondary.main
          })}
        />
      );
      break;

    default:
      result = <Mail />;
  }
  return result;
};

export default function MenuItem(props: MenuItemProps) {
  const { title, url, selected } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <>
      <ListItem
        button
        key={title}
        onClick={handleClick}
        selected={selected}
        sx={{
          borderLeft: selected ? "1px solid #ED7433" : "0px"
        }}
      >
        <ListItemIcon
          sx={{
            marginLeft: 0.35
          }}
        >
          {findIcon(title, selected)}
        </ListItemIcon>
        <ListItemText
          secondary={title}
          secondaryTypographyProps={{
            style: {
              color: selected ? "#F2F2F2" : "#BDBDBD"
            }
          }}
        />
      </ListItem>
    </>
  );
}
