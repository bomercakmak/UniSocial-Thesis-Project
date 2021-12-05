import { toast } from "react-toastify";
import { put, takeEvery } from "redux-saga/effects";
import firebase from "../../api/firebase";

function* createEvent(action) {
  try {
    const ref = yield firebase.firestore().collection("events");
    yield ref.doc(action.payload.newEvent.eventId).set(action.payload.newEvent);
    toast.success("Your event has been successfully created!");
    action.payload.history.push("/home");
    yield put({ type: "CREATE_EVENT_SUCCESS" });
  } catch (e) {
    toast.error(e.message);
    yield put({ type: "CREATE_EVENT_FAIL", error: e.message });
  }
}

function* eventSaga() {
  yield takeEvery("CREATE_EVENT", createEvent);
}

export default eventSaga;
