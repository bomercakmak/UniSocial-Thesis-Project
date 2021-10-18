import { toast } from "react-toastify";
import { put, takeEvery } from "redux-saga/effects";
import firebase from "../../api/firebase";

function* loginUser(action) {
  try {
    yield firebase
      .auth()
      .signInWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      );
    yield put({ type: "LOGIN_USER_SUCCESS" });
  } catch (e) {
    yield put({ type: "LOGIN_USER_FAIL", error: e });
  }
}

function* registerUser(action) {
  try {
    yield console.log(action.payload);
    const response = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      );
    yield console.log(response.user.uid);
    const ref = yield firebase.firestore().collection("users");
    yield ref.doc(response.user.uid).set(action.payload);
    toast.success("Your account has been successfully created!");
    yield put({ type: "REGISTER_USER_SUCCESS" });
  } catch (e) {
    toast.error(e.message);
    yield put({ type: "REGISTER_USER_FAIL", error: e.message });
  }
}

function* authSaga() {
  yield takeEvery("LOGIN_USER", loginUser);
  yield takeEvery("REGISTER_USER", registerUser);
}

export default authSaga;
