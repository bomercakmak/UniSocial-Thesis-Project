import { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "./api/firebase";
import { userStatus } from "./redux/actions/auth";
import Routes from "./routes/Routes";

const App = () => {
  console.log("app run");
  const dispatch = useDispatch();
  const ref = firebase.firestore().collection("users");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ref.where("userId", "==", user.uid).onSnapshot((querySnapshot) => {
          let objectval = null;
          querySnapshot.forEach((doc) => {
            objectval = { ...doc.data() };
          });
          dispatch(userStatus(objectval));
        });
      } else {
        dispatch(userStatus(user));
      }
    });
  }, [dispatch, ref]);
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
