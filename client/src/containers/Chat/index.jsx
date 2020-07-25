import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { getMessages, addNewMessage, deleteMessage, likeMessage, editRecentDate } from './actions';
import AddMessage from '../../components/AddMessage';
import ChatInfo from '../../components/ChatInfo';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import styles from './styles.module.scss';

const Chat = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    chat: {loading, messages, lastMessageDate},
    currentUser: { user: {id, avatar, user} }
  } = useSelector(({chat, currentUser}) => ({chat, currentUser}));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getMessages());
  },[]);

  useEffect(() => {
    if (messages) {
      const messageLastDate = moment(messages[messages.length - 1].createdAt).format();
      dispatch(editRecentDate(messageLastDate));
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]);

  const saveNewMessage = text => {
    const message = {
      userId: id,
      text,
      avatar,
      user,
      likes: new Set(),
    }
    dispatch(addNewMessage(message));
  }
  
  const lastMessageToEdit = (e) => {
    if (e.keyCode !== 38) {
      return;
    }
    const userMessages = messages.filter(el => el.userId === id)
    const {id: messageId} = userMessages.reduce(function (r, a) {
      return r.createdAt > a.createdAt ? r : a;
    });

    history.push(`/message/${messageId}`)
  }

  return (
    <React.Fragment>
      {(loading || !messages) ? <Spinner/> : (
        <section className={styles.container}>
        <ChatInfo countMessages={messages.length} countUsers={0} lastMessageDate={lastMessageDate}/>
          <article className={styles.messageField}>
            {messages.map(item => (
            <Message
              key={item.id}
              message={item}
              currentUserId={id}
              deleteMessage={deleteMessage}
              likeMessage={likeMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </article>
        <AddMessage saveNewMessage={saveNewMessage} lastMessageToEdit={lastMessageToEdit}/>
      </section>)}
    </React.Fragment>
  )
}

export default Chat
