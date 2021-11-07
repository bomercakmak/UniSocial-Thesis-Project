import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import Home from "../pages/Home/Home";

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
            <Redirect to="/home" />
          </Route>
          <Route path="/login">
            <Redirect to="/home" />
          </Route>
          {/* ************************************************ */}
          <Route path="/home">
            <h1>Home</h1>
          </Route>
          <Route path="/">404</Route>
        </Switch>
      </Home>
    );
  }

  return <>{routesStrucere}</>;
};

export default Routes;
