import {
  MESSAGES_REQUEST,
  ADD_MESSAGE_REQUEST,
  EDIT_MESSAGE_REQUEST,
  DELETE_MESSAGE_REQUEST,
  UPDATE_LAST_MESSAGE_DATE,
  LIKE_TOGGLE
} from './types';


export const getMessages = () => ({
  type: MESSAGES_REQUEST,
});

export const addNewMessage = message => ({
  type: ADD_MESSAGE_REQUEST,
  payload: message
});

export const modifyMessage = message => ({
  type: EDIT_MESSAGE_REQUEST,
  payload: message
});

export const deleteMessage = id => ({
  type: DELETE_MESSAGE_REQUEST,
  payload: id
});

export const editRecentDate = messageLastDate => ({
  type: UPDATE_LAST_MESSAGE_DATE,
  payload: messageLastDate
});

export const likeMessage = (id, currentUserId) => ({
  type: LIKE_TOGGLE,
  payload: { id, user: currentUserId }
})