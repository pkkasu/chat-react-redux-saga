import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewUser, modifyUser } from '../Admin/actions';
import styles from './styles.module.scss';

const UserEditor = ({match: {params}, history}) => {
  const dispatch = useDispatch();
  
  const userToEdit = useSelector(state => state.users.users.find(el => el.id === params.id));
  const [user, setUser] = useState({
    avatar: '',
    login: '',
    password: '',
    role: 'user',
    email: '',
    user: ''
  });
  React.useEffect(() => {
    if (userToEdit) {
      const { avatar, login, password, role, email, user: username } = userToEdit;
      setUser({...user, avatar, login, password, role, email, user: username })
    }
  }, []);

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault();
    if (params.id !== 'new') {
      dispatch(modifyUser(user, params.id))
    } else {
      dispatch(addNewUser(user))
    }
    onCancel();
  }

  const onCancel = () => history.push('/list');

  return (
    <section className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        {user.avatar && <img src={user.avatar} className={styles.form__avatar} alt={user}></img>}
        <input className={styles.form__field} type="text" value={user.user} placeholder="Username" name="user" onChange={handleChange}/>
        <input className={styles.form__field} type="text" value={user.login} placeholder="Login" name="login" onChange={handleChange}/>
        <input className={styles.form__field} type="text" value={user.password} placeholder="Password" name="password" onChange={handleChange}/>
        <input className={styles.form__field} type="text" value={user.email} placeholder="Email" name="email" onChange={handleChange}/>
        <input className={styles.form__field} type="text" value={user.avatar} placeholder="Avatar link" name="avatar" onChange={handleChange}/>
        <div className={styles.form__footer}>
          <input type="button" className={styles.form__button} value="Cancel" onClick={onCancel}/>
          <input type="submit" className={styles.form__button} value="Save" />
        </div>
      </form>
    </section>
  )
}

export default UserEditor
