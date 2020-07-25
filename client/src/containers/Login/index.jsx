import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import SubmitButton from '../../components/SubmitButton';
import { login } from './action';

const Login = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    login: '',
    password: ''
  });
  const inputHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  }
  return (
    <section className={styles.container}>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <input className={styles.loginForm__field}type="text" value={user.login} name="login" onChange={inputHandler} placeholder="Login"/>
        <input className={styles.loginForm__field}type="text" value={user.password} name="password" onChange={inputHandler} placeholder="Password"/>
        <SubmitButton />
      </form>
    </section>
  )
}

export default Login
