import * as type from "../types";

const initialState = {
  userStatus: [],
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case type.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userStatus: action.userStatus,
      };
    case type.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
