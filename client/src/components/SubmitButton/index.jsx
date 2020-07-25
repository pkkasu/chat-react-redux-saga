import React from 'react';
import styles from './styles.module.scss';

const SubmitButton = () => {
  return (
    <input type="submit" value="Send" className={styles.buttonSubmit}/>
  )
}

export default SubmitButton
