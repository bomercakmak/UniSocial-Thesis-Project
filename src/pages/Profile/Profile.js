import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import firebase from "../../api/firebase";
import { useParams } from "react-router-dom";
import Header from "./Header";
import CardComp from "../../components/Card/Card";

const theme = createTheme();

const Profile = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.userStatus);
  console.log(currentUser);
  const [currentProfile, setCurrentProfile] = useState();
  const [currentProfileEvents, setCurrentProfileEvents] = useState([]);
  const unixTime = currentProfile?.createdAt.seconds;
  const date = new Date(unixTime * 1000);
  console.log(currentProfile);
  const refUser = firebase.firestore().collection("users");
  const refEvent = firebase.firestore().collection("events");
  console.log("eventss", currentProfileEvents);
  useEffect(() => {
    refUser.where("userId", "==", id).onSnapshot((querySnapshot) => {
      let objectval = null;
      querySnapshot.forEach((doc) => {
        objectval = { ...doc.data() };
      });
      setCurrentProfile(objectval);
    });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (currentProfile && currentProfile?.userId) {
      refEvent
        .where("eventOwnerId", "==", currentProfile?.userId)
        .onSnapshot((querySnapshot) => {
          const item = [];
          querySnapshot.forEach((doc) => {
            item.push(doc.data());
          });
          console.log(item);
          setCurrentProfileEvents(item);
        });
    }
    // eslint-disable-next-line
  }, [currentProfile]);
  console.log(currentUser?.userId === currentProfile?.userId);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          joinEvent=""
          title={`${currentProfile?.firstName} ${currentProfile?.lastName}`}
          likeEvent=""
          currentUserId={currentUser?.userId}
          IsEditProfile={currentUser?.userId === currentProfile?.userId}
          profile={currentProfile}
        />
        <main>
          <MainFeaturedPost
            profile={{
              title: "",
              description: currentProfile?.about,
              image: currentProfile?.profileImgUrl,
              mageText: currentProfile?.firstName,
            }}
          />
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                "& .markdown": {
                  py: 3,
                },
              }}
            >
              <Main
                title={`Recent events created by ${currentProfile?.firstName}`}
                description=""
              />

              {currentProfileEvents.map((event) => {
                return (
                  <Grid item xs={12} md={12} key={event.eventId}>
                    <CardComp event={event} />
                  </Grid>
                );
              })}
            </Grid>

            <Sidebar
              departmentTitle="Department"
              department={currentProfile?.department}
              joinDateTitle="UniSocial Join Date"
              joinDate={date.toLocaleString()}
              emailTitle="Email"
              email={currentProfile?.email}
              social={currentProfile?.social}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
