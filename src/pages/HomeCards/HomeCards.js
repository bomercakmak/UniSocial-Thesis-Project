import CardComp from "../../components/Card/Card";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/event";
import { useState } from "react";
import firebase from "../../api/firebase";
import { useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";

// // const Item = styled(Paper)(({ theme }) => ({
// //   ...theme.typography.body2,
// //   padding: theme.spacing(1),
// //   textAlign: "center",
// //   color: theme.palette.text.secondary,
// // }));
const HomeCards = () => {
  // const events = useSelector((state) => state.event.events);
  const currentUser = useSelector((state) => state.auth.userStatus);
  const [events, setEvents] = useState([]);
  const search = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const ref = firebase.firestore().collection("events");

    // console.log("geldiiii");
    // if (search.pathname === "/events") {
    ref.onSnapshot((querySnapshot) => {
      const eventsAll = [];
      querySnapshot.forEach((doc) => {
        eventsAll.push(doc.data());
      });
      console.log(eventsAll);
      setEvents(eventsAll);
    });
    return;
    // }

    // if (search.pathname === "/attendedEvents" && currentUser?.userId) {
    //   ref
    //     .where("eventParticipants", "array-contains", currentUser?.userId)
    //     .onSnapshot((querySnapshot) => {
    //       const eventsAttended = [];
    //       querySnapshot.forEach((doc) => {
    //         eventsAttended.push(doc.data());
    //       });
    //       dispatch(getEvents(eventsAttended));
    //     });
    //   return;
    // }
    // console.log("gelid");
    // console.log(search.pathname === "/likedEvents");
    // if (search.pathname === "/likedEvents" && currentUser?.userId) {
    //   console.log(search.pathname, "girdiiiiiiiii");
    //   ref
    //     .where("eventLikes", "array-contains", currentUser?.userId)
    //     .onSnapshot((querySnapshot) => {
    //       const eventsLike = [];
    //       querySnapshot.forEach((doc) => {
    //         eventsLike.push(doc.data());
    //       });
    //       console.log("girdiiiiii2iii", eventsLike);
    //       dispatch(getEvents(eventsLike));
    //       return;
    //     });
    //   return;
    // }
  }, []);
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {events.map((event) => {
          return (
            <Grid item xs={12} md={6} key={event.eventId}>
              <CardComp event={event} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default HomeCards;
