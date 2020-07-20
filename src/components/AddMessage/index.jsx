import React, { useState } from 'react';
import styles from './styles.module.scss';

const AddMessage = ({ saveNewMessage, lastMessageToEdit }) => {
  const [message, setMessage] = useState("");

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    saveNewMessage(message);
    setMessage('');
  }

  return (
    <form onSubmit={sendMessage} className={styles.container}>
      <textarea name="message" id="message" onChange={inputHandler} value={message} onKeyUp={lastMessageToEdit} className={styles.container__field}></textarea>
      <input type="submit" value="Send" className={styles.container__button} />
    </form>
  )
}

export default AddMessage
