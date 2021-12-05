import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </MuiPickersUtilsProvider>,

  document.getElementById("root")
);
