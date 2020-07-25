import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { modifyMessage } from '../Chat/actions';

const EditMessage = (props) => {
  const dispatch = useDispatch();
  const history = props.history;
  const { id } = props.match.params;
  const messageToEdit = useSelector(state => state.chat.messages.find(el => el.id ===id));
  const [text, setText] = useState(messageToEdit.text);
  
  const inputHandler = (e) => {
    setText(e.target.value);
  }

  const onSubmit = e => {
    const message = {
      userId: messageToEdit.userId,
      text,
      avatar: messageToEdit.avatar,
      user: messageToEdit.user,
      likes: messageToEdit.likes,
    }
    dispatch(modifyMessage({id: messageToEdit.id, message }));
    onCancel();
  };

  const onCancel = () => history.push('/chat')
  return (
    <React.Fragment>
      {messageToEdit
        ? <div className={styles.modal}>
            <div className={styles.modal__body}>
              <textarea name="messageEdit" id="messageEdit" onChange={inputHandler} value={text} className={styles.modal__field}></textarea>
            </div>
            <div className={styles.modal__footer}>
              <input type="button" className={styles.modal__button} value="Cancel" onClick={onCancel}/>
              <input type="button" className={styles.modal__button} value="Save" onClick={onSubmit}/>
            </div>
        </div>
        : onCancel()
      }
    </React.Fragment>
  )
}

export default EditMessage
