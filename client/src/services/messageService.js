import callWebApi from '../helpers/webApiHelper';

export const getMessages = async () => {
  const response = await callWebApi({
    endpoint: '/message',
    type: 'GET'
  });
  return response.json();
};

export const addNewMessage = async request => {
  const response = await callWebApi({
    endpoint: '/message',
    type: 'POST',
    request
  });
  return response.json();
};

export const modifyMessage = async (request, id) => {
  const response = await callWebApi({
    endpoint: `/message/${id}`,
    type: 'PUT',
    request
  });
  return response.json();
};

export const deleteMessage = async id => {
  const response = await callWebApi({
    endpoint: `/message/${id}`,
    type: 'DELETE',
  });
  return response.json();
}