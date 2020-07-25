import React from 'react'
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Error = () => {
  return (
    <div className={styles.notification}>
      <FontAwesomeIcon icon={faExclamationCircle} className={styles.notification__sign} />
      <div className={styles.notification__desc}>
        <span className={styles.notification__title}>Error</span>
        <span>Something went wrong. Please, try again later.</span>
      </div>
    </div>
  )
}

export default Error
