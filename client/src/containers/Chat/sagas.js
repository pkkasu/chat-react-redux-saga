import { call, put, takeEvery } from 'redux-saga/effects';
import { getMessages, addNewMessage, deleteMessage, modifyMessage } from '../../services/messageService';

import { 
  MESSAGES_REQUEST, 
  MESSAGES_SUCCESS,
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE_SUCCESS,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  EDIT_MESSAGE_REQUEST,
  EDIT_MESSAGE_SUCCESS,
  MESSAGE_FAIL
} from './types';

function * getMessagesFlow() {
  try {
    const res = yield call(getMessages);
    const messages = res.map(item => ({...item, likes: new Set()})).sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    const lastMessageDate = messages[messages.length - 1];
    yield put({
      type: MESSAGES_SUCCESS,
      payload: {
        messages,
        lastMessageDate
      }
    })
  } catch (error) {
    yield put({
      type: MESSAGE_FAIL,
      payload: error
    })
  }
}
function * addMessageFlow({payload}) {
  try {
    const res = yield call(addNewMessage, payload);
    const message = {
      ...res,
      likes: new Set()
    }
    yield put({
      type: ADD_MESSAGE_SUCCESS,
      payload: message
    });

  } catch (error) {
    yield put({
      type: MESSAGE_FAIL,
      payload: error.message
    });
  }
}
function * deleteMessageFlow({payload}) {
  try {
    yield call(deleteMessage, payload)
    yield put({
      type: DELETE_MESSAGE_SUCCESS,
      payload
    });
  } catch (error) {
    yield put({
      type: MESSAGE_FAIL,
      payload: error.message
    });
  }
}
function * editMessageFlow({payload: {message, id}}) {
  try {
    const res = yield call(modifyMessage, message, id);
    yield put({
      type: EDIT_MESSAGE_SUCCESS,
      payload: res
    })
  } catch (error) {
    yield put({
      type: MESSAGE_FAIL,
      payload: error.message
    });
  }
}

export default function* chatWatcher() {
  yield takeEvery(MESSAGES_REQUEST, getMessagesFlow);
  yield takeEvery(ADD_MESSAGE_REQUEST, addMessageFlow);
  yield takeEvery(DELETE_MESSAGE_REQUEST, deleteMessageFlow);
  yield takeEvery(EDIT_MESSAGE_REQUEST, editMessageFlow);
}