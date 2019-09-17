import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'v1/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!token) {
      console.tron.error('não tem token')
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/home');
  } catch (err) {
    toast.error('Fail on sign In. Please verify your email/password');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, nickname, email, password, bio, urls, role } = payload;

    yield call(api.post, '/v1/users', {
      name,
      nickname,
      email,
      password,
      bio,
      urls,
      role,
    });

    history.push('/login');
  } catch (err) {
    toast.error('Sign Up fail, pease verify yours informations');

    yield put(signFailure());
  }
}

// export function setToken({ payload }) {
//   if (!payload) return;

//   const { token } = payload.auth;

//   if (token) {
//     api.defaults.headers.Authorization = `Bearer ${token}`;
//   }
// }

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  // takeLatest('persist/REHYDRATE', setToken),
]);
