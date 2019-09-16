import { takeLatest, call, put, all } from 'redux-saga/effects';
import { login } from '../../../utils/auth';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, '/v1/sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  yield put(signInSuccess(token, user));

  login(token);

  history.push('/');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
