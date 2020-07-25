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

export const initialState = {
  loading: true,
  users: null,
  error: null
}

export default (state=initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case USERS_REQUEST:
    case EDIT_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, payload]
      }
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map(user => user.id === payload.id ? {...user, ...payload} : user)
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(({id}) => id !== payload)
      }
    case USER_FAIL:
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
}