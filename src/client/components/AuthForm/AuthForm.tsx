import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setIsAuth, failAuthIncrement } from '../../redux/authSlice';
import { setMessage } from '../../redux/snackbarSlice';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.sass';


export function AuthForm({ className }: {className: string}) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleHelpClick = () => {
    const name = localStorage.getItem('name');
    const password = localStorage.getItem('password');
    if (name) setName(name);
    if (password) setPassword(password);
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isTrueName = (localStorage.getItem('name') === name);
    const isTruePassword = (localStorage.getItem('password') === name);
    if (isTrueName && isTruePassword) {
      history.push('/profile');
      dispatch(setIsAuth(true));
    } else {
      dispatch(failAuthIncrement(1));
      dispatch(setMessage('Your name or password is failed...'));
    }
  };

  return (
    <form className={`${styles.form} ${className}`} name="auth" onSubmit={handleFormSubmit}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          Sign In
        </legend>
        <input
          className={styles.name}
          type="text"
          name="name"
          value={name}
          onChange={(evt) => {setName(evt.target.value)}}
          placeholder="User Name" />
        <input
          className={styles.password}
          type="text" // must be password
          name="password"
          value={password}
          onChange={(evt) => {setPassword(evt.target.value)}}
          placeholder="Password" />
        <label className={styles.remember}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="save"
          />
          Remember Me
        </label>
        <Button
          className={styles.signin}
          type="submit"
        >
          Sign In
        </Button>
        <input
          className={styles.help}
          type="button"
          onClick={handleHelpClick}
          value="&#128712; Lost Password ?"
        />
      </fieldset>
    </form>
  );
}
