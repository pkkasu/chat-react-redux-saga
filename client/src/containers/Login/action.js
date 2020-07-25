import { LOGIN_REQUEST } from './types';

export const login = data => ({
  type: LOGIN_REQUEST,
  payload: data
});
