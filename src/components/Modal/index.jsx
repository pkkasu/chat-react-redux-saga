import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Portal from '../Portal';
import styles from './styles.module.scss';

const Modal = ({title, isOpen, onCancel, onSubmit, message}) => {
  const [text, setText] = useState(message.text);
  const inputHandler = (e) => {
    setText(e.target.value);
  }
  return (
    <React.Fragment>
      { isOpen && 
      <Portal>
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modal__header}>
              <div className={styles.modal__title}>{ title }</div>
              <FontAwesomeIcon icon={faWindowClose} onClick={onCancel} className={styles.modal__close}/>
            </div>
            <div className={styles.modal__body}>
              <textarea name="messageEdit" id="messageEdit" onChange={inputHandler} value={text} className={styles.modal__field}></textarea>
            </div>
            <div className={styles.modal__footer}>
              <input type="button" className={styles.modal__button} value="Cancel" onClick={onCancel}/>
              <input type="button" className={styles.modal__button} value="Save" onClick={onSubmit(text)}/>
            </div>
          </div>
        </div>
      </Portal>
      }
    </React.Fragment>
  )
}

export default Modal
