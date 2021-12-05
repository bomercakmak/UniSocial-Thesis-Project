import * as type from "../types";

export function createEvent(newEvent, history) {
  return {
    type: type.CREATE_EVENT,
    payload: { newEvent, history },
  };
}
