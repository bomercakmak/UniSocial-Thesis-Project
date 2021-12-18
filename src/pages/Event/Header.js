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
        {+event?.eventParticipantsLimitNumber === 0 ||
        event?.eventParticipants.length <
          +event?.eventParticipantsLimitNumber ||
        event?.eventParticipants.includes(currentUser.userId) ? (
          event?.eventParticipants.includes(currentUser.userId) ? (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={joinEvent}
            >
              <>Exit event</>
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={joinEvent}
            >
              <>Join Event</>
            </Button>
          )
        ) : (
          <Button
            variant="outlined"
            color="success"
            size="small"
            disabled
            onClick={joinEvent}
          >
            <>Event Full</>
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
