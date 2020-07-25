import { call, put, takeEvery } from 'redux-saga/effects';
import { getUsers, addNewUser, deleteUser, modifyUser } from '../../services/userService';

import { 
  USERS_REQUEST,
  USERS_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  USER_FAIL,
} from './types';

function * getUsersFlow() {
  try {
    const users = yield call(getUsers);
    yield put({
      type: USERS_SUCCESS,
      payload: users
    })
  } catch (error) {
    yield put({
      type: USER_FAIL,
      payload: error.message
    })
  }
}
function * addUserFlow({payload}) {
  try {
    const user = yield call(addNewUser, payload);
    yield put({
      type: ADD_USER_SUCCESS,
      payload: user
    });

  } catch (error) {
    yield put({
      type: USER_FAIL,
      payload: error.message
    });
  }
}
function * deleteUserFlow({payload}) {
  try {
    yield call(deleteUser, payload)
    yield put({
      type: DELETE_USER_SUCCESS,
      payload
    });
  } catch (error) {
    yield put({
      type: USER_FAIL,
      payload: error.message
    });
  }
}
function * editUserFlow({payload: {user, id}}) {
  try {
    const res = yield call(modifyUser, user, id);
    yield put({
      type: EDIT_USER_SUCCESS,
      payload: res
    })
  } catch (error) {
    yield put({
      type: USER_FAIL,
      payload: error.message
    });
  }
}

export default function* usersWatcher() {
  yield takeEvery(USERS_REQUEST, getUsersFlow);
  yield takeEvery(ADD_USER_REQUEST, addUserFlow);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserFlow);
  yield takeEvery(EDIT_USER_REQUEST, editUserFlow);
}