import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

function Header(props) {
  const { title, editProfile, IsEditProfile, currentUserId } = props;
  return (
    <React.Fragment>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}
      >
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
        {IsEditProfile && (
          <Button
            component={Link}
            to={`/editProfile/${currentUserId}`}
            variant="contained"
            size="small"
            endIcon={<EditIcon />}
            onClick={editProfile}
          >
            Edit Profile
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
