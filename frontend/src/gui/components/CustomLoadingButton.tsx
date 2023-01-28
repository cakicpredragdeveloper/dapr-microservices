import { memo } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import makeStyles from "@mui/styles/makeStyles/makeStyles";

interface CustomLoadingButtonProps {
  text: string;
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  loading: {
    "& .MuiCircularProgress-svg": {
      color: "#FFFFFF"
    }
  }
}));

const CustomLoadingButton = ({ text, loading }: CustomLoadingButtonProps) => {
  const classes = useStyles();

  return (
    <LoadingButton
      variant="contained"
      classes={{
        loading: classes.loading
      }}
      sx={(theme) => ({
        margin: theme.spacing(4, 0, 2),
        borderRadius: "34px",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main
        }
      })}
      loading={loading}
      size="large"
      type="submit"
    >
      {text}
    </LoadingButton>
  );
};

export default memo(CustomLoadingButton);
