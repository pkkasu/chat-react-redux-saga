import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserItem from '../../components/UserItem';
import { getUsers, deleteUser } from './actions';
import Spinner from '../../components/Spinner';
import styles from './styles.module.scss';

const Admin = () => {
  const dispatch = useDispatch();
  const { loading, users} = useSelector(state => state.users);
  const { isAdmin, user: {id} } = useSelector(state => state.currentUser);

  useEffect(() => {
    dispatch(getUsers());
  },[]);

  return (
    <React.Fragment>
    {isAdmin ? (
      <React.Fragment>
        {(loading || !users) ? <Spinner/> : (
        <section className={styles.container}>
          <nav className={styles.navigation}>
            <Link to="/chat" className={styles.navigation__link}>Chat</Link>
            <Link to={`/editor/new`} className={styles.navigation__link}>Add user</Link>
          </nav>
          <article className={styles.userList}>
            {users && users.map(item => (
              <UserItem 
              key={item.id}
              user={item}
              deleteUser={deleteUser}
              currentUserId={id}
              />
            ))}
          </article>
        </section>)}
      </React.Fragment>
    ) : <Redirect to="/chat"/>}
    </React.Fragment>
  )
}

export default Admin
