import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import firebase from "../../api/firebase";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
export const mainListItems = (
  <div>
    <ListItem button component={Link} to={"/events"}>
      <ListItemIcon>
        <HomeIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to={"/attendedEvents"}>
      <ListItemIcon>
        <BookmarkAddedIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Attended Events" />
    </ListItem>
    <ListItem button component={Link} to={"/likedEvents"}>
      <ListItemIcon>
        <FavoriteIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Liked Events" />
    </ListItem>
    <ListItem button component={Link} to={"/createEvent"}>
      <ListItemIcon>
        <AddCircleOutlineIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Create Event" />
    </ListItem>
  </div>
);
const logoutClickHandler = () => {
  console.log("clieck");
  confirmAlert({
    title: "Confirm to logout",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          firebase.auth().signOut();
        },
      },
      {
        label: "No",
      },
    ],
  });
};

export const SecondaryListItems = () => {
  const currentUser = useSelector((state) => state.auth.userStatus);

  return (
    <div>
      <ListSubheader inset>Your Account</ListSubheader>
      <ListItem button component={Link} to={`/profile/${currentUser.userId}`}>
        <ListItemIcon>
          <AccountCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to={`/editProfile/${currentUser.userId}`}
      >
        <ListItemIcon>
          <EditIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
      <ListItem button onClick={logoutClickHandler}>
        <ListItemIcon>
          <LogoutIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};
