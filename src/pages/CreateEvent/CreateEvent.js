import React, { useState } from "react";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { DateTimePicker } from "@material-ui/pickers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { storage } from "../../api/firebase";
import noImg from "../../assets/img/noImg.jpg";
import Input from "@mui/material/Input";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Button from "@mui/material/Button";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import BottomRight from "../../components/toastify/BottomRight";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../api/firebase";
import { useSelector, useDispatch } from "react-redux";
import { createEvent } from "../../redux/actions/event";
import { useHistory } from "react-router-dom";

const CreateEvent = () => {
  const history = useHistory();
  const [loadingIn, setLoadingIn] = useState(false);
  const [eventImageSrc, setEventImageSrc] = useState(noImg);
  const [eventOnline, setEventOnline] = useState("No");
  const [covidRules, setCovidRules] = useState("No");
  const [whatCovidRules, setWhatCovidRules] = useState("");
  const [limitValue, setLimitValue] = useState("Unlimited");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPaid, setEventPaid] = useState("Free");
  const [eventCost, setEventCost] = useState("");
  const [valueTime, setValueTime] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [participantsNumber, setParticipantsNumber] = useState(0);
  const [category, setCategory] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const currentUser = useSelector((state) => state.auth.userStatus);
  const loading = useSelector((state) => state.event.loading);
  const dispatch = useDispatch();

  const handleCreateEvent = () => {
    if (
      eventName.trim() === "" ||
      eventPlace.trim() === "" ||
      eventDescription.trim() === ""
    ) {
      toast.error("Please fill in the required fields!");
      return;
    }
    let eventImgLast = eventImageSrc;
    if (eventImgLast === noImg) {
      eventImgLast =
        "https://firebasestorage.googleapis.com/v0/b/unisocial-thesis-project.appspot.com/o/images%2FnoImg.jpg?alt=media&token=b9e71db6-0ab6-46ad-bdb7-a0e3c9e7cac5";
    }
    const newEvent = {
      eventName: eventName,
      eventId: uuidv4(),
      eventImg: eventImgLast,
      eventDate: valueTime,
      eventPlace: eventPlace,
      eventCategory: category,
      eventDescription: eventDescription,
      eventParticipantsLimitNumber: participantsNumber,
      eventLikes: [],
      eventParticipants: [],
      eventPaid: eventPaid,
      eventCost: eventCost,
      eventCovidRules: covidRules,
      eventWhatCovidRules: whatCovidRules,
      eventOnline: eventOnline,
      eventCreatedAt: timestamp(),
      eventOwnerId: currentUser.userId,
      eventOwnerName: `${currentUser.firstName} ${currentUser.lastName}`,
      eventOwnerProfileImg: currentUser.profileImgUrl,
      eventOwnerEmail: currentUser.email,
      eventOwnerAbout: currentUser.about,
      eventOwnerDepartment: currentUser.department,
      eventOwnerSocial: currentUser.social,
      eventOwnerCreatedAt: currentUser.createdAt,
    };

    dispatch(createEvent(newEvent, history));
  };

  const handleParticipantChange = (event) => {
    setParticipantsNumber(0);
    setLimitValue(event.target.value);
  };

  const handlePaidChange = (event) => {
    setEventCost("");
    setEventPaid(event.target.value);
  };

  const handleCovidRules = (event) => {
    setWhatCovidRules("");
    setCovidRules(event.target.value);
  };
  const profileImgChange = (e) => {
    if (e.target.files[0]) {
      setLoadingIn(true);
      const uploadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setLoadingIn(false);
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => {
              setEventImageSrc(url);
              setLoadingIn(false);
            });
        }
      );
    } else {
      setEventImageSrc(
        "https://firebasestorage.googleapis.com/v0/b/unisocial-thesis-project.appspot.com/o/images%2FnoImg.jpg?alt=media&token=b9e71db6-0ab6-46ad-bdb7-a0e3c9e7cac5"
      );
    }
  };
  return (
    <div>
      <BottomRight />
      <h1>Create Event</h1>
      <Paper elevation={3} style={{ padding: "30px" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} align="center" justifyContent="center">
            {loadingIn && (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#1976D2"}
                height={40}
                width={49}
              />
            )}
            <label htmlFor="contained-button-file">
              <img
                alt="profile"
                hidden={loadingIn}
                style={{ maxHeight: "350px" }}
                src={eventImageSrc}
              />
              <Input
                onChange={profileImgChange}
                style={{ display: "none" }}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              {!loadingIn && (
                <ModeEditOutlineIcon
                  color="primary"
                  style={{
                    color: "#286090",
                    background: "#ddd",
                    borderRadius: "50%",
                    marginLeft: "-40px",
                    fontSize: "40px",
                    padding: "7px",
                  }}
                />
              )}
            </label>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Event Name"
              variant="filled"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              // renderinput={(params) => <TextField {...params} />}
              label="Select the event time"
              value={valueTime}
              inputVariant="filled"
              required
              fullWidth
              onChange={(newValue) => {
                console.log(newValue);
                setValueTime(newValue);
              }}
              minDate={new Date()}
              mintime={new Date(0, 0, 0, 8)}
              maxtime={new Date(0, 0, 0, 18, 45)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Event Place & Link"
              variant="filled"
              fullWidth
              value={eventPlace}
              onChange={(e) => setEventPlace(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="demo-simple-select-label">
                  Select the category of the event.
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Age"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"Festivals"}>Festivals</MenuItem>
                  <MenuItem value={"Conferences"}>Conferences</MenuItem>
                  <MenuItem value={"Webinars"}>Webinars</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <FormLabel component="legend">
              Is the participants limited?
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={limitValue}
              onChange={handleParticipantChange}
            >
              <FormControlLabel
                value="Limited"
                control={<Radio />}
                label="Limited"
              />
              <FormControlLabel
                value="Unlimited"
                control={<Radio />}
                label="Unlimited"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={3}>
            {limitValue === "Limited" && (
              <TextField
                id="outlined-basic2"
                label="The number of participants"
                variant="filled"
                fullWidth
                value={participantsNumber}
                onChange={(e) => {
                  setParticipantsNumber(e.target.value);
                }}
                type="number"
              />
            )}
          </Grid>
          <Grid item xs={3}>
            <FormLabel component="legend">Is the event paid?</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={eventPaid}
              onChange={handlePaidChange}
            >
              <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
              <FormControlLabel value="Free" control={<Radio />} label="Free" />
            </RadioGroup>
          </Grid>
          <Grid item xs={3}>
            {eventPaid === "Paid" && (
              <TextField
                id="outlined-basic"
                label="Cost of the event"
                variant="filled"
                fullWidth
                value={eventCost}
                onChange={(e) => {
                  setEventCost(e.target.value);
                }}
              />
            )}
          </Grid>
          <Grid item xs={3}>
            <FormLabel component="legend">
              Are there any rules for covid?
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={covidRules}
              onChange={handleCovidRules}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={3}>
            {covidRules === "Yes" && (
              <TextField
                id="outlined-basic"
                label="Covid Rules"
                variant="filled"
                fullWidth
                value={whatCovidRules}
                onChange={(e) => {
                  setWhatCovidRules(e.target.value);
                }}
              />
            )}
          </Grid>
          <Grid item xs={3}>
            <FormLabel component="legend">Is the event online?</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={eventOnline}
              onChange={(e) => setEventOnline(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-multiline-static"
              label="Event Description"
              multiline
              required
              fullWidth
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={4}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} align="center" justifyContent="center">
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleCreateEvent}
            >
              {!loading ? (
                "Create Event"
              ) : (
                <ReactLoading
                  type={"spinningBubbles"}
                  color={"#1976D2"}
                  height={30}
                  width={34}
                />
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CreateEvent;
