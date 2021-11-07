import * as type from "../types";

const initialState = {
  userStatus: "Loading",
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case type.USER_STATUS:
      return {
        ...state,
        userStatus: action.payload,
      };
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
      };
    case type.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case type.REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case type.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
