import { call, put, takeEvery } from 'redux-saga/effects';
import {login} from '../../services/authService';
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from './types';

function* loginFlow({payload}) {
  try {
    const response  = yield call(login, payload);
    yield put ({ type: LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put ({ type: LOGIN_FAIL, payload: error.response });
  }
}

export default function* loginWatcher() {
  yield takeEvery(LOGIN_REQUEST, loginFlow)
}