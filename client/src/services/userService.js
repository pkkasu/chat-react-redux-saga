import callWebApi from '../helpers/webApiHelper';

export const getUsers = async () => {
  const response = await callWebApi({
    endpoint: '/users',
    type: 'GET'
  });
  return response.json();
};

export const addNewUser = async request => {
  const response = await callWebApi({
    endpoint: '/users',
    type: 'POST',
    request
  });
  return response.json();
};

export const modifyUser = async (request, id) => {
  const response = await callWebApi({
    endpoint: `/users/${id}`,
    type: 'PUT',
    request
  });
  return response.json();
};

export const deleteUser = async id => {
  const response = await callWebApi({
    endpoint: `/users/${id}`,
    type: 'DELETE',
  });
  return response.json();
}