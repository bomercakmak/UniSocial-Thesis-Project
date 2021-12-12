import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import firebase from "../../api/firebase";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Typography from "@mui/material/Typography";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const theme = createTheme();

const Event = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.userStatus);

  const [currentEvent, setCurrentEvent] = useState();
  const unixTime = currentEvent?.eventDate.seconds;
  const date = new Date(unixTime * 1000);
  console.log(currentEvent);
  const ref = firebase.firestore().collection("events");
  useEffect(() => {
    ref.where("eventId", "==", id).onSnapshot((querySnapshot) => {
      let objectval = null;
      querySnapshot.forEach((doc) => {
        objectval = { ...doc.data() };
      });
      setCurrentEvent(objectval);
    });
  }, [id]);
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
    }
    currentEvent.eventParticipants.push(currentUser.userId);
    ref
      .doc(currentEvent.eventId)
      .update(currentEvent)
      .catch((err) => {
        console.log(err);
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
              description={currentEvent?.eventOwnerAbout}
              date={currentEvent?.eventOwnerDepartment}
              imageLabel={currentEvent?.eventOwnerName}
              title={currentEvent?.eventOwnerName}
              image={currentEvent?.eventOwnerProfileImg}
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
              eventCovidRulesTitle="Covid Rules"
              eventCovidRules={currentEvent?.eventWhatCovidRules}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Event;
