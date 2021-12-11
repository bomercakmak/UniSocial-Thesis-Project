import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Header(props) {
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}
      >
        <Button size="small">Like Event</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <Button variant="outlined" size="small">
          Join the event
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
