import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Container from "@mui/material/Container/Container";

interface LoaderProps {
  background?: boolean;
  view?: boolean;
  white?: boolean;
}

export default function Loader({ background = false, view = false, white = false }: LoaderProps) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        zIndex: 999,
        width: view ? "100vw" : "50vw",
        height: view ? "100vh" : "50vh",
        margin: "auto",
        overflow: "show",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: white ? "#FFFFFF" : background ? "#40454E" : "#fefbf9"
      }}
    >
      <CircularProgress />
    </Container>
  );
}
