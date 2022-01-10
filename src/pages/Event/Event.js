import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import firebase from "../../api/firebase";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { confirmAlert } from "react-confirm-alert";

const theme = createTheme();

const Event = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.userStatus);

  const [currentEvent, setCurrentEvent] = useState();
  const [currentEventOwner, setCurrentEventOwner] = useState();
  const unixTime = currentEvent?.eventDate.seconds;
  const date = new Date(unixTime * 1000);
  console.log(currentEvent);
  const ref = firebase.firestore().collection("events");
  const refUsers = firebase.firestore().collection("users");
  useEffect(() => {
    ref.where("eventId", "==", id).onSnapshot((querySnapshot) => {
      let objectval = null;
      querySnapshot.forEach((doc) => {
        objectval = { ...doc.data() };
      });
      setCurrentEvent(objectval);
    });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (currentEvent && currentEvent?.eventOwnerId) {
      refUsers
        .where("userId", "==", currentEvent?.eventOwnerId)
        .onSnapshot((querySnapshot) => {
          let objectval = null;
          querySnapshot.forEach((doc) => {
            objectval = { ...doc.data() };
          });
          console.log(objectval);
          setCurrentEventOwner(objectval);
        });
    }
    // eslint-disable-next-line
  }, [currentEvent?.eventOwnerId]);
  const eventLike = () => {
    if (currentEvent?.eventLikes.includes(currentUser.userId)) {
      let updatedEventLike = [];
      updatedEventLike = currentEvent?.eventLikes.filter(
        (e) => e !== currentUser.userId
      );
      const updatedEvent = { ...currentEvent, eventLikes: updatedEventLike };
      ref
        .doc(currentEvent?.eventId)
        .update(updatedEvent)
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    currentEvent.eventLikes.push(currentUser.userId);
    ref
      .doc(currentEvent.eventId)
      .update(currentEvent)
      .catch((err) => {
        console.log(err);
      });
  };
  const joinEvent = () => {
    if (currentEvent?.eventParticipants.includes(currentUser.userId)) {
      confirmAlert({
        title: "Confirm to exit event!",
        message: "Are you sure to exit event.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              let updatedEventParticipants = [];
              updatedEventParticipants = currentEvent?.eventParticipants.filter(
                (e) => e !== currentUser.userId
              );
              const updatedEvent = {
                ...currentEvent,
                eventParticipants: updatedEventParticipants,
              };
              ref
                .doc(currentEvent?.eventId)
                .update(updatedEvent)
                .catch((err) => {
                  console.log(err);
                });
              return;
            },
          },
          {
            label: "No",
          },
        ],
      });
      return;
    }
    confirmAlert({
      title: "Confirm to join event!",
      message: "Are you sure to join event!",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            currentEvent.eventParticipants.push(currentUser.userId);
            ref
              .doc(currentEvent.eventId)
              .update(currentEvent)
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          joinEvent={joinEvent}
          title={currentEvent?.eventName}
          likeEvent={eventLike}
          event={currentEvent}
        />
        <main>
          <MainFeaturedPost
            post={{
              title: currentEvent?.eventName,
              image: currentEvent?.eventImg,
              mageText: currentEvent?.eventName,
            }}
          />
          <Grid container spacing={4}>
            <FeaturedPost
              eventOwnerId={currentEvent?.eventOwnerId}
              description={currentEventOwner?.about}
              date={currentEventOwner?.department}
              currentEventOwner={`${currentEventOwner?.firstName} ${currentEventOwner?.lastName}`}
              title={`${currentEventOwner?.firstName} ${currentEventOwner?.lastName}`}
              image={currentEventOwner?.profileImgUrl}
            />
          </Grid>

          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main
              title={`Event Description`}
              // title={currentEvent?.eventName}
              post={currentEvent?.eventDescription}
            />
            <Sidebar
              eventTimeTitle="Event Time"
              eventTime={date.toLocaleString()}
              eventPlaceTitle={
                currentEvent?.eventOnline ? "Event Place" : "Event Link"
              }
              eventPlace={currentEvent?.eventPlace}
              totalParticipantsTitle="Total Participants"
              totalParticipants={currentEvent?.eventParticipantsLimitNumber}
              eventParticipants={currentEvent?.eventParticipants?.length}
              eventCategoryTitle="Event Category"
              eventCategory={currentEvent?.eventCategory}
              eventFeeTitle="Event Fee"
              eventFee={
                currentEvent?.eventCost === ""
                  ? "Free Event"
                  : currentEvent?.eventCost
              }
              eventFormLink={currentEvent?.eventFormLink}
              eventContactNumberText={currentEvent?.eventContactNumberText}
              eventCovidRulesTitle="Covid Rules"
              eventCovidRules={currentEvent?.eventWhatCovidRules}
              social={currentEventOwner?.social}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Event;
