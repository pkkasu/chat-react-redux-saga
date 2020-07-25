import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

const Message = ({
  message: {text, user, avatar, createdAt, userId, likes, id},
  currentUserId,
  deleteMessage,
  likeMessage
}) => {
  const dispatch = useDispatch();
  const isLiked = likes.has(currentUserId);
  return (
    <div className={`${styles.container} ${currentUserId === userId ? styles.right : styles.left}`}>
      {currentUserId !== userId && <img src={avatar} className={styles.avatar} alt={user}></img>}
      <div className={styles.message}>
        <div className={styles.message__user}>{user}</div>
        <div className={styles.message__text}>{text}</div>
        <div className={styles.meta}>
          <div className={styles.meta__data}>{moment(createdAt).fromNow()}</div>
          {likes.size > 0  && <span className={styles.meta__likes}>{likes.size} liked</span>}
          {currentUserId === userId && (
            <div className={styles.meta__controls}>
              <Link to={`/message/${id}`}><FontAwesomeIcon icon={faPencilAlt} className={styles.meta__controls__pencil}/></Link>
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => dispatch(deleteMessage(id))}  className={styles.meta__controls__trash}/>
            </div>
          )}
          {currentUserId !== userId && <FontAwesomeIcon icon={faHeart} onClick={() => dispatch(likeMessage(id, currentUserId))} className={`${styles.meta__likeButton} ${isLiked && styles.meta__liked}`}/>}
        </div>
      </div>
    </div>
  )
}

export default Message
