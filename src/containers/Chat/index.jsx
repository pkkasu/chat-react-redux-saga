import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMessages,
  addNewMessage,
  modifyMessage,
  deleteMessage,
  likeMessage,
  editRecentDate
} from './actions';
import AddMessage from '../../components/AddMessage';
import ChatInfo from '../../components/ChatInfo';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import styles from './styles.module.scss';

const Chat = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    chat: {loading, messages, lastMessageDate, users},
    currentUser: { id }
  } = useSelector(({chat, currentUser}) => ({chat, currentUser}));
  const [messageToEdit, setMessageToEdit] = useState(null); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getMessages());
  },[]);

  useEffect(() => {
    if (messages) {
      dispatch(editRecentDate());
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]);

  const editMessage = (text, messageId) => e => {
    setMessageToEdit({text, messageId});
    setShowModal(true);
  };

  const saveEditedMessage = (text) => e => {
    dispatch(modifyMessage({messageId: messageToEdit.messageId, text }));
    setMessageToEdit(null);
    setShowModal(false);
  };

  const saveNewMessage = text => {
    dispatch(addNewMessage(text));
  }

  const cancelEditMessage = () => {
    setMessageToEdit(null);
    setShowModal(false);
  }
  
  const lastMessageToEdit = (e) => {
    if (e.keyCode !== 38) {
      return;
    }
    const userMessages = messages.filter(el => el.id === id)
    const {text, messageId} = userMessages.reduce(function (r, a) {
      return r.createdAt > a.createdAt ? r : a;
    });
    setMessageToEdit({text, messageId});
    setShowModal(true);
  }

  return (
    <React.Fragment>
      {showModal && <Modal isOpen={showModal} title="Edit message" onCancel={cancelEditMessage} onSubmit={saveEditedMessage} message={messageToEdit}></Modal>}
      {(loading || !messages) ? <Spinner/> : (
        <section className={styles.container}>
        <ChatInfo countMessages={messages.length} countUsers={users.size} lastMessageDate={lastMessageDate}/>
          <article className={styles.messageField}>
            {messages.map(item => (
            <Message
              key={item.messageId}
              message={item}
              currentUserId={id}
              deleteMessage={deleteMessage}
              saveEditedMessage={saveEditedMessage}
              editMessage={editMessage}
              likeMessage={likeMessage}/>
            ))}
            <div ref={messagesEndRef} />
          </article>
        <AddMessage saveNewMessage={saveNewMessage} lastMessageToEdit={lastMessageToEdit}/>
      </section>)}
    </React.Fragment>
  )
}

export default Chat
