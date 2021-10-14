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
    // const loginStatus = yield call(login);
    yield put({ type: "LOGIN_USER_SUCCESS" });
  } catch (e) {
    yield put({ type: "LOGIN_USER_FAIL", error: e });
  }
}

function* authSaga() {
  yield takeEvery("LOGIN_USER", loginUser);
}

export default authSaga;
