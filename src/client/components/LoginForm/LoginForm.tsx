import {FormEvent, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMessage} from '../../store/snackbarSlice';
import {Button} from '../Button/Button';
import styles from './LoginForm.module.sass';
import {TextInput} from '../TextInput/TextInput';
import {Checkbox} from '../Checkbox/Checkbox';

export type TLoginFormProps = {
  className?: string;
};

export function LoginForm({className}: TLoginFormProps) {
  const dispatch = useDispatch();
  const nameField = useRef<null | HTMLInputElement>(null);
  const passwordField = useRef<null | HTMLInputElement>(null)


  const handleHelpClick = () => {

  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(nameField.current?.value);
    console.log(passwordField.current?.value)
    dispatch(setMessage('Your name or password is failed...'));
  };

  return (
    <form
      className={`${styles.loginForm} ${className}`}
      name={'login'}
      onSubmit={handleFormSubmit}
    >
      <fieldset className={styles.loginForm__fieldset}>
        <legend className={styles.loginForm__title}>
          {'Войти'}
        </legend>
        <TextInput
          className={styles.loginForm__textInput}
          type={'text'}
          name={'name'}
          placeholder={'введите имя'}
          ref={nameField}
        />
        <TextInput
          className={styles.loginForm__textInput}
          type={'password'}
          name={'password'}
          placeholder={'введите пароль'}
          ref={passwordField}
        />
        <Checkbox
          className={styles.loginForm__checkbox}
          name={'save'}
          icon="&#xeb53;"
          caption={'Запомнить меня'}
        />
        <Button
          className={styles.loginForm__filledButton}
          type={'submit'}
          variant={'filled'}
          caption={'Войти'}
        />
        <Button
          className={styles.loginForm__textedButton}
          type={'button'}
          variant={'texted'}
          onClick={handleHelpClick}
          icon="&#xebf9;"
          caption={'Забыли логин или пароль ?'}
        />
      </fieldset>
    </form>
  );
}
