import { combineReducers } from "redux";
import auth from "./auth";
import event from "./event";

const rootReducer = combineReducers({
  auth: auth,
  event: event,
});

export default rootReducer;
