import * as type from "../types";

export function loginUser(email, password) {
  return {
    type: type.LOGIN_USER,
    payload: { email, password },
  };
}
