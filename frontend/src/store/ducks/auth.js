// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Initial state
const INITIAL_STATE = {
  id: 0,
  isAuth: false,
  name: '',
};

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      const { user } = action;

      return {
        ...state,
        id: user.id,
        name: user.name,
        isAuth: true,
      };

    case LOGOUT:
      return {
        ...state,
        id: 0,
        isAuth: false,
        name: '',
      };

    default:
      return state;
  }
}

// Action Creators
export function reduxLogin(user) {
  return { type: LOGIN, user };
}

export function reduxLogout() {
  return { type: LOGOUT };
}
