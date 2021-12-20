import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { NavLink, useHistory } from "react-router-dom";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import firebase from "../../api/firebase";

function Header(props) {
  const { title, likeEvent, event, joinEvent } = props;
  const currentUser = useSelector((state) => state.auth.userStatus);
  const refEvent = firebase.firestore().collection("events");
  const history = useHistory();
  const deleteEvent = () => {
    confirmAlert({
      title: "Confirm to delete event!",
      message: "Are you sure to delete your event!",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            refEvent
              .doc(event?.eventId)
              .delete()
              .catch((err) => {
                console.log(err);
              });
            history.push("/events");
            toast.success("Your event has been successfully deleted.");
            return;
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}
      >
        {event?.eventLikes.length}

        <Button size="small" onClick={likeEvent}>
          {event?.eventLikes.includes(currentUser.userId) ? (
            <>
              <FavoriteIcon style={{ marginRight: "5px" }} />
              Unlike Event
            </>
          ) : (
            <>
              <FavoriteBorderIcon style={{ marginRight: "5px" }} />
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
          {title?.toUpperCase()}
        </Typography>

        {+event?.eventParticipantsLimitNumber === 0 ||
        event?.eventParticipants.length <
          +event?.eventParticipantsLimitNumber ||
        event?.eventParticipants.includes(currentUser.userId) ? (
          event?.eventParticipants.includes(currentUser.userId) ? (
            <Button
              variant="contained"
              size="small"
              onClick={joinEvent}
              style={{ marginRight: "5px", fontSize: "75%" }}
            >
              <MeetingRoomIcon
                style={{
                  fontSize: "16px",
                  marginBottom: "1px",
                  marginRight: "5px",
                }}
              />
              <>Exit event</>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={joinEvent}
              style={{ marginRight: "5px", fontSize: "75%" }}
            >
              <AddCircleOutlineIcon
                style={{
                  fontSize: "16px",
                  marginBottom: "1px",
                  marginRight: "5px",
                }}
              />
              <>Join Event</>
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            color="success"
            size="small"
            disabled
            style={{ marginRight: "5px", fontSize: "75%" }}
            onClick={joinEvent}
          >
            <ReduceCapacityIcon
              style={{
                fontSize: "16px",
                marginBottom: "1px",
                marginRight: "5px",
              }}
            />
            <>Event Full</>
          </Button>
        )}
        {event?.eventOwnerId === currentUser?.userId && (
          <>
            <Button
              component={NavLink}
              to={`/editEvent/${event?.eventId}`}
              variant="contained"
              color="warning"
              size="small"
              style={{
                fontSize: "75%",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            >
              <EditIcon
                style={{
                  fontSize: "16px",
                  marginBottom: "1px",
                  marginRight: "5px",
                }}
              />
              <>Edit Event</>
            </Button>
            <Button
              onClick={deleteEvent}
              variant="contained"
              color="error"
              size="small"
              style={{
                fontSize: "75%",
                marginLeft: "5px",
              }}
            >
              <DeleteIcon
                style={{
                  fontSize: "16px",
                  marginBottom: "1px",
                  marginRight: "5px",
                }}
              />
              <>Delete Event</>
            </Button>
          </>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
