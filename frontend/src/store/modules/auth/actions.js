export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action Creators
export function reduxLogin(user) {
  return { type: LOGIN, user };
}

export function reduxLogout() {
  return { type: LOGOUT };
}
