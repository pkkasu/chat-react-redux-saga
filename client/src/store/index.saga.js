import {all} from 'redux-saga/effects';
import loginWatcher from '../containers/Login/sagas';
import chatWatcher from '../containers/Chat/sagas';
import usersWatcher from '../containers/Admin/sagas';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    chatWatcher(),
    usersWatcher()
  ]);
}