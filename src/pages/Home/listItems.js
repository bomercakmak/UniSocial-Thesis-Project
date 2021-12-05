import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import firebase from "../../api/firebase";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to={"/createEvent"}>
      <ListItemIcon>
        <AddCircleOutlineIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Create Post" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CategoryIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Choose Category" />
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

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Your Account</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Profile Settings" />
    </ListItem>
    <ListItem button onClick={logoutClickHandler}>
      <ListItemIcon>
        <LogoutIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
