import * as React from "react";
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
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../api/firebase";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
  const ref = firebase.firestore().collection("events");

  const unixTime = event.eventDate.seconds;
  const date = new Date(unixTime * 1000);
  const eventLike = () => {
    if (event.eventLikes.includes(currentUser.userId)) {
      let updatedEventLike = [];
      updatedEventLike = event.eventLikes.filter(
        (e) => e !== currentUser.userId
      );
      const updatedEvent = { ...event, eventLikes: updatedEventLike };
      ref
        .doc(event.eventId)
        .update(updatedEvent)
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    event.eventLikes.push(currentUser.userId);
    ref
      .doc(event.eventId)
      .update(event)
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card>
      <NavLink
        to={`/event/${event.eventId}`}
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        <CardHeader title={`${event.eventName}`} />
      </NavLink>
      <CardHeader
        avatar={
          <Avatar
            src={event.eventOwnerProfileImg}
            alt={event.eventOwnerName}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {event.eventOwnerName.substring(0, 2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={event.eventOwnerName}
        subheader={`On: ${date.toLocaleString()}`}
      />
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
          {event.eventDescription?.length > 170
            ? `${event.eventDescription?.substring(0, 170)}...`
            : event.eventDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={eventLike}>
          {event.eventLikes.length}
          {event.eventLikes.includes(currentUser.userId) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

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
