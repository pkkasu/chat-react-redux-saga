import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS} from './types';

export const initialState = {
  user: null,
  loading: false,
  isAuth: false,
  isAdmin: false,
  error: null
};

export default (state=initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      const {user, role, id, email, avatar } = payload;
      return {
        ...state,
        user: { user, id, email, avatar },
        isAdmin: role === 'admin' ? true : false,
        isAuth: true,
        loading: false
      }
    case LOGIN_FAIL:
      localStorage.removeItem('token', payload.token);
      return {
        ...state,
        user: null,
        isAuth: false,
        isAdmin: false,
        loading: false,
        error: payload.error
      }
    default:
      return state
  }
}