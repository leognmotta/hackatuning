export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/sign_in_success',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  }
}
