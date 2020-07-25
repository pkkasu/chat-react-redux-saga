import {
  USERS_REQUEST,
  ADD_USER_REQUEST,
  EDIT_USER_REQUEST,
  DELETE_USER_REQUEST
} from './types';


export const getUsers = () => ({
  type: USERS_REQUEST,
});

export const addNewUser = user => ({
  type: ADD_USER_REQUEST,
  payload: user
});

export const modifyUser = (user, id) => {
  return {type: EDIT_USER_REQUEST,
  payload: {
    user, 
    id
  }}
};

export const deleteUser = id => ({
  type: DELETE_USER_REQUEST,
  payload: id
});
