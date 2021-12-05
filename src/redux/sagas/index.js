import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import eventSaga from "./eventSaga";

export default function* rootSaga() {
  yield all([authSaga(), eventSaga()]);
}
