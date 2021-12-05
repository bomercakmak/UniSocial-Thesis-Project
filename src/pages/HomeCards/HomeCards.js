import CardComp from "../../components/Card/Card";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/event";
import firebase from "../../api/firebase";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";

// // const Item = styled(Paper)(({ theme }) => ({
// //   ...theme.typography.body2,
// //   padding: theme.spacing(1),
// //   textAlign: "center",
// //   color: theme.palette.text.secondary,
// // }));
const HomeCards = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  console.log("homeeeee", events);
  const ref = firebase.firestore().collection("events");

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      dispatch(getEvents(events));
    });
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
