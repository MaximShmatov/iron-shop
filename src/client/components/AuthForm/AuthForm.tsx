import {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setIsAuth, failAuthIncrement} from '../../store/authSlice';
import {setMessage} from '../../store/snackbarSlice';
import {Button} from '../Button/Button';
import styles from './AuthForm.module.sass';


export function AuthForm({className}: { className: string }) {
  const dispatch = useDispatch();
  const authData = useSelector(({auth}) => auth.credentials);
  const history = useHistory();
  const [credentials, setCredentials] = useState({name: '', password: ''});

  const handleHelpClick = () => {
    setCredentials({...authData})
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isTrueName = (authData.name === credentials.name);
    const isTruePassword = (authData.password === credentials.password);
    if (isTrueName && isTruePassword) {
      dispatch(setIsAuth(true));
      history.push('/profile');
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
          value={credentials.name}
          onChange={(evt) => {
            setCredentials({...credentials, name: evt.target.value})
          }}
          placeholder="User Name"/>
        <input
          className={styles.password}
          type="password"
          name="password"
          value={credentials.password}
          onChange={(evt) => {
            setCredentials({...credentials, password: evt.target.value})
          }}
          placeholder="Password"/>
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
