import * as type from "../types";

export function createEvent(newEvent, history) {
  return {
    type: type.CREATE_EVENT,
    payload: { newEvent, history },
  };
}

export function getEvents(events) {
  return {
    type: type.GET_EVENT,
    events: events,
  };
}
