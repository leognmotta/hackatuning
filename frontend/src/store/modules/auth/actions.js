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

export function signUpRequest(name, email, password, bio, skill ) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password, bio, skill },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
