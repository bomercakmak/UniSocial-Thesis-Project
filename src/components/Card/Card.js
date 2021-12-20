import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../api/firebase";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import "./card.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardComp({ event }) {
  const currentUser = useSelector((state) => state.auth.userStatus);
  const ref = firebase.firestore().collection("users");
  const refEvent = firebase.firestore().collection("events");
  const [currentEventOwner, setCurrentEventOwner] = useState();
  const unixTime = event.eventDate.seconds;
  const date = new Date(unixTime * 1000);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    ref
      .where("userId", "==", event.eventOwnerId)
      .onSnapshot((querySnapshot) => {
        let objectval = null;
        querySnapshot.forEach((doc) => {
          objectval = { ...doc.data() };
        });
        setCurrentEventOwner(objectval);
      });

    // eslint-disable-next-line
  }, []);
  const eventLike = () => {
    if (event.eventLikes.includes(currentUser.userId)) {
      let updatedEventLike = [];
      updatedEventLike = event.eventLikes.filter(
        (e) => e !== currentUser.userId
      );
      const updatedEvent = { ...event, eventLikes: updatedEventLike };
      refEvent
        .doc(event.eventId)
        .update(updatedEvent)
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    event.eventLikes.push(currentUser.userId);

    refEvent
      .doc(event.eventId)
      .update(event)
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteEvent = () => {
    setAnchorEl(null);

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
    <Card style={{ marginBottom: "20px" }}>
      <NavLink to={`/event/${event.eventId}`} className={"event-card"}>
        <CardHeader
          title={`${event?.eventName?.toUpperCase()}`}
          className={"event-card"}
        />
      </NavLink>
      <CardHeader
        avatar={
          <NavLink to={`/profile/${event.eventOwnerId}`}>
            <Avatar
              src={currentEventOwner?.profileImgUrl}
              alt={currentEventOwner?.firstName}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            >
              {currentEventOwner?.firstName.substring(0, 2)}
            </Avatar>
          </NavLink>
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${currentEventOwner?.firstName} ${currentEventOwner?.lastName}`}
        subheader={`On: ${date.toLocaleString()}`}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component={NavLink}
          to={`/profile/${currentEventOwner?.userId}`}
        >
          <AccountCircle
            style={{
              fontSize: "20px",
              marginRight: "10px",
              color: "#1976D2",
            }}
          />
          Organizer Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={NavLink}
          to={`/event/${event?.eventId}`}
        >
          <InfoIcon
            style={{
              fontSize: "20px",
              marginRight: "10px",
              color: "#1976D2",
            }}
          />
          Event Details
        </MenuItem>
        {currentEventOwner?.userId === currentUser?.userId && (
          <MenuItem
            component={NavLink}
            to={`/editEvent/${event?.eventId}`}
            onClick={handleClose}
          >
            <EditIcon
              style={{
                fontSize: "20px",
                marginRight: "10px",
                color: "#FFE400",
              }}
            />
            Edit Event
          </MenuItem>
        )}
        {currentEventOwner?.userId === currentUser?.userId && (
          <MenuItem onClick={deleteEvent}>
            <DeleteIcon
              style={{
                fontSize: "20px",
                marginRight: "10px",
                color: "#FF1700",
              }}
            />
            Delete Event
          </MenuItem>
        )}
      </Menu>
      <NavLink
        to={`/event/${event.eventId}`}
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        <CardMedia
          component="img"
          height="auto"
          image={event.eventImg}
          alt={event.Name}
        />
      </NavLink>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {event.eventDescription?.length > 150
            ? `${event.eventDescription?.substring(0, 150)}...`
            : event.eventDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={eventLike}>
          {event.eventLikes.includes(currentUser.userId) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        {event.eventLikes.length} Likes
        <ExpandMore
          style={{
            fontSize: "15px",
            borderRadius: "0",
            color: "#1976D2",
          }}
        >
          <NavLink
            to={`/event/${event.eventId}`}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Go to the details
          </NavLink>
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
