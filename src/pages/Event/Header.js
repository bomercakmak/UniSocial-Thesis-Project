import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";

function Header(props) {
  const { title, likeEvent, event, joinEvent } = props;
  const currentUser = useSelector((state) => state.auth.userStatus);

  return (
    <React.Fragment>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}
      >
        {event?.eventLikes.length}

        <Button size="small" onClick={likeEvent}>
          {event?.eventLikes.includes(currentUser.userId) ? (
            <>
              <FavoriteIcon />
              Unlike Event
            </>
          ) : (
            <>
              <FavoriteBorderIcon />
              Like Event
            </>
          )}
        </Button>
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
        <Button variant="outlined" size="small" onClick={joinEvent}>
          {event?.eventParticipants.includes(currentUser.userId) ? (
            <>Exit event</>
          ) : (
            <>Join Event</>
          )}
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
