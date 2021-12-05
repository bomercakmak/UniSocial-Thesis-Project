import * as type from "../types";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

export default function event(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_EVENT:
      return {
        ...state,
        loading: true,
      };
    case type.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case type.CREATE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case type.GET_EVENT:
      return {
        ...state,
        loading: true,
      };
    case type.GET_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        events: action.events,
      };
    case type.GET_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
