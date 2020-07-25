import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

const UserItem = ({user: {email, user, avatar, id}, deleteUser, currentUserId}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <img src={avatar} className={styles.avatar} alt={user}></img>
      <span>{email}</span>
      <div className={styles.controls}>
        <Link to={`/editor/${id}`}><FontAwesomeIcon icon={faPencilAlt} className={styles.controls__pencil}/></Link>
        {currentUserId !== id && (
        <FontAwesomeIcon icon={faTrashAlt} onClick={() => dispatch(deleteUser(id))}  className={styles.controls__trash}/>
        )}
      </div>
    </div>
  )
}

export default UserItem
