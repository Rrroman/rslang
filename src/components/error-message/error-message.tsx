import React from 'react';
import styles from './error-message.module.css';

type Props = {
  text: string;
};

const ErrorMessage: React.FC<Props> = ({ text }) => (
  <div className={styles['auth-err-msg']}>*{text}</div>
);

export { ErrorMessage };
