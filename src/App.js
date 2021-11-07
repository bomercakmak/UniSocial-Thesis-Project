import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./pages/Auth/Login/Login";
import firebase from "./api/firebase";
import Register from "./pages/Auth/Register/Register";
import Dashboard from "./pages/Home/Home";

const App = () => {
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
          // dispatch(authActions.authStatus(objectval));
          console.log(objectval);
        });
      } else {
        // dispatch(authActions.authStatus(user));
        console.log(user);
      }
    });
  }, [dispatch, ref]);
  return (
    <>
      {/* <Dashboard>
        <h1>Hello</h1>
      </Dashboard> */}
      <Register />
    </>
  );
};

export default App;
