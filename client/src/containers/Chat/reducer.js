import {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  ADD_MESSAGE_SUCCESS,
  EDIT_MESSAGE_REQUEST,
  EDIT_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  MESSAGE_FAIL,
  UPDATE_LAST_MESSAGE_DATE,
  LIKE_TOGGLE
} from './types';

export const initialState = {
  loading: true,
  messages: null,
  error: null,
  lastMessageDate: null
}

export default (state=initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case MESSAGES_REQUEST:
    case EDIT_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case MESSAGES_SUCCESS:
      const { messages, lastMessageDate} = payload;
      return {
        ...state,
        loading: false,
        messages,
        lastMessageDate
      }
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload]
      }
    case UPDATE_LAST_MESSAGE_DATE:
      return {
        ...state,
        lastMessageDate: payload
      }
    case EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.map(message => message.id === payload.id ? {...message, ...payload} : message)
      }
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.filter(({id}) => id !== payload)
      }
    case LIKE_TOGGLE:
      return {
        ...state,
        messages: state.messages.map(message => {
          const { likes } = message;
          const {id, user} = payload;
          if (message.id === id) {
            likes.has(user) ? likes.delete(user) : likes.add(user)
          }
          return {...message, likes}
      })
      }
    case MESSAGE_FAIL:
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
}