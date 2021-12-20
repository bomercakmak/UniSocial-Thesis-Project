import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import Home from "../pages/Home/Home";
import HomeCards from "../pages/HomeCards/HomeCards";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Blog from "../pages/Event/Event";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import EditEvent from "../pages/EditEvent/EditEvent";

const Routes = () => {
  const userStatus = useSelector((state) => state.auth.userStatus);
  let routesStrucere;

  if (userStatus === "Loading") {
    routesStrucere = (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ReactLoading
          type={"spinningBubbles"}
          color={"#1976D2"}
          height={60}
          width={66}
        />
      </div>
    );
  }

  if (userStatus === null) {
    routesStrucere = (
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }

  if (userStatus && userStatus !== "Loading") {
    routesStrucere = (
      <Home>
        <Switch>
          {/* ************************************************ */}
          <Route path="/register">
            <Redirect to="/events" />
          </Route>
          <Route path="/login">
            <Redirect to="/events" />
          </Route>
          {/* ************************************************ */}
          <Route exact path="/event/:id">
            <Blog />
          </Route>
          <Route exact path="/editProfile/:id">
            <EditProfile />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact path="/attendedEvents">
            <HomeCards />
          </Route>
          <Route exact path="/likedEvents">
            <HomeCards />
          </Route>
          <Route exact path="/editEvent/:id">
            <EditEvent />
          </Route>
          <Route exact path="/events">
            <HomeCards />
          </Route>
          <Route path="/createEvent">
            <CreateEvent />
          </Route>
          <Route exact path="/">
            404
          </Route>
        </Switch>
      </Home>
    );
  }

  return <>{routesStrucere}</>;
};

export default Routes;
