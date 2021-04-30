import {ButtonHTMLAttributes} from 'react';
import styles from './Button.module.sass';


export function Button(props: ButtonHTMLAttributes<object>) {
  const { type, children, onClick, className } = props;
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}