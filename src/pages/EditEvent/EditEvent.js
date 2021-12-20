import React, { useState, useEffect } from "react";
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
import firebase from "../../api/firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const EditEvent = () => {
  const [currentEvent, setCurrentEvent] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const [loadingIn, setLoadingIn] = useState(false);
  const [eventImageSrc, setEventImageSrc] = useState(noImg);
  const [eventOnline, setEventOnline] = useState("No");
  const [covidRules, setCovidRules] = useState("No");
  const [whatCovidRules, setWhatCovidRules] = useState("");
  const [eventForm, setEventForm] = useState("No");
  const [eventFormLink, setEventFormLink] = useState("");
  const [contactNumber, setContactNumber] = useState("No");
  const [contactNumberText, setContactNumberText] = useState("");
  const [limitValue, setLimitValue] = useState("Unlimited");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPaid, setEventPaid] = useState("Free");
  const [eventCost, setEventCost] = useState("");
  const [valueTime, setValueTime] = useState(Date(+1));
  const [eventName, setEventName] = useState("");
  const [participantsNumber, setParticipantsNumber] = useState(0);
  const [category, setCategory] = useState("");
  const [eventPlace, setEventPlace] = useState("");

  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const currentUser = useSelector((state) => state.auth.userStatus);
  const loading = useSelector((state) => state.event.loading);
  const dispatch = useDispatch();

  const refEvent = firebase.firestore().collection("events");

  useEffect(() => {
    refEvent.where("eventId", "==", id).onSnapshot((querySnapshot) => {
      let objectval = null;
      querySnapshot.forEach((doc) => {
        objectval = { ...doc.data() };
      });

      if (objectval?.eventOwnerId !== currentUser?.userId) {
        history.push("/events");
      }
      const unixTime = objectval.eventDate.seconds;
      const date = new Date(unixTime * 1000);

      setCurrentEvent(objectval);
      setEventName(objectval.eventName);
      setValueTime(date);
      setEventPlace(objectval.eventPlace);
      setCategory(objectval.eventCategory);
      setLimitValue(
        +objectval.eventParticipantsLimitNumber === 0 ? "Unlimited" : "Limited"
      );
      setParticipantsNumber(+objectval.eventParticipantsLimitNumber);
      setEventPaid(objectval.eventPaid);
      setEventCost(objectval.eventCost);
      setEventForm(objectval.eventForm);
      setEventFormLink(objectval.eventFormLink);
      setContactNumber(objectval.eventContactNumber);
      setContactNumberText(objectval.eventContactNumberText);
      setCovidRules(objectval.eventCovidRules);
      setWhatCovidRules(objectval.eventWhatCovidRules);
      setEventOnline(objectval.eventOnline);
      setEventDescription(objectval.eventDescription);
      setEventImageSrc(objectval.eventImg);
      console.log(objectval);
      return () => {};
    });
    // eslint-disable-next-line
  }, [id]);
  console.log(currentEvent);
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
    const updatedEvent = {
      eventName: eventName,
      eventImg: eventImgLast,
      eventDate: valueTime,
      eventPlace: eventPlace,
      eventCategory: category,
      eventDescription: eventDescription,
      eventParticipantsLimitNumber: participantsNumber,
      eventPaid: eventPaid,
      eventCost: eventCost,
      eventCovidRules: covidRules,
      eventWhatCovidRules: whatCovidRules,
      eventForm: eventForm,
      eventFormLink: eventFormLink,
      eventContactNumber: contactNumber,
      eventContactNumberText: contactNumberText,
      eventOnline: eventOnline,
    };
    confirmAlert({
      title: "Confirm to update event!",
      message: "Are you sure to update your event!",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            refEvent
              .doc(currentEvent.eventId)
              .update(updatedEvent)
              .catch((err) => {
                console.log(err);
              });
            toast.success("Your event has been successfully updated.");
            history.push(`/event/${currentEvent?.eventId}`);
            return;
          },
        },
        {
          label: "No",
        },
      ],
    });
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
  const handleEventForm = (event) => {
    setEventFormLink("");
    setEventForm(event.target.value);
  };
  const handleContactNumber = (event) => {
    setContactNumberText("");
    setContactNumber(event.target.value);
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
      <h1>Edit Event</h1>
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
              // defaultValue={valueTime}
              fullWidth
              onChange={(newValue) => {
                console.log(newValue);
                setValueTime(newValue);
              }}
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
              Is event application form exist?
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={eventForm}
              onChange={handleEventForm}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={3}>
            {eventForm === "Yes" && (
              <TextField
                id="eventLink"
                label="Event Application Form Link"
                variant="filled"
                fullWidth
                value={eventFormLink}
                onChange={(e) => {
                  setEventFormLink(e.target.value);
                }}
              />
            )}
          </Grid>
          <Grid item xs={3}>
            <FormLabel component="legend">
              Is there any contact number?
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={contactNumber}
              onChange={handleContactNumber}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={3}>
            {contactNumber === "Yes" && (
              <TextField
                id="contactNumber"
                label="Contact Number"
                variant="filled"
                fullWidth
                value={contactNumberText}
                onChange={(e) => {
                  setContactNumberText(e.target.value);
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
                id="CovidRules"
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
                "Update Event"
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

export default EditEvent;
