import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import notFoundImg from "../../../resources/NotFound.svg";

export default function NotFound() {
  return (
    <Grid container justifyContent="center" mt={15}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#9CABA6"
          }}
        >
          Page Not Found
        </Typography>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
        mt={-7}
      >
        <img src={notFoundImg} alt={"Page Not Found icon"} width="380px" height="380px" />
      </Grid>
    </Grid>
  );
}
