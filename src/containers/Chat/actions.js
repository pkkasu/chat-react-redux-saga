import moment from 'moment';
import axios from 'axios';
import {
  MESSAGES_RECIEVED,
  ADD_MESSAGE,
  UPDATE_LAST_MESSAGE_DATE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  LIKE_TOGGLE,
  ERROR_CATCH
} from './types';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const messageService = async () => {
  try {
    const res = await axios.get('https://api.npoint.io/a139a0497ad54efd301f');
    const users = new Map();
    res.data.forEach(({id, avatar, user}) => users.set(id, {id, avatar, user}));
    const messages = res.data.map(item => ({...item, likes: new Set(), messageId: generateId()}))
      .sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    return {users, messages}
  } catch (error) {
    throw new Error(error);
  }
};

export const getMessages = () => async dispatch => {
  try {
    const data = await messageService();
    dispatch({
      type: MESSAGES_RECIEVED,
      payload: data
    });
  } catch (error) {
    dispatch({type: ERROR_CATCH, payload: {message: error.message}})
  }
}

export const addNewMessage = message => (dispatch, getState) => {
  const { id, avatar, user } = getState().currentUser;
  dispatch({type: ADD_MESSAGE, payload: {
    text: message,
    id,
    user,
    avatar,
    messageId: generateId(),
    likes: new Set(),
    createdAt: moment().format(),
    editedAt: ''
  }})
}

export const modifyMessage = ({text, messageId}) => dispatch => {
  dispatch({type: EDIT_MESSAGE, payload: {messageId, text, editedAt: moment().format()}})
}

export const deleteMessage = id => dispatch => {
  dispatch({type: DELETE_MESSAGE, payload: id})
};

export const likeMessage = (id, user) => dispatch => {
  dispatch({type: LIKE_TOGGLE, payload: {id, user}})
};

export const editRecentDate = () => (dispatch, getState) => {
  const { messages } = getState().chat;
  const messageLastDate = moment(messages[messages.length - 1].createdAt).format();
  dispatch({type: UPDATE_LAST_MESSAGE_DATE, payload: messageLastDate});
}
