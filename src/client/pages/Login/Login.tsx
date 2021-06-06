import {useDispatch, useSelector} from 'react-redux';
import {setIsAuth} from '../../store/authSlice';
import {Button} from '../../components/Button/Button';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import styles from './Login.module.sass';


export default function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(({auth}) => auth.isAuth);

  const handleButtonClick = () => {
    dispatch(setIsAuth(false));
  };

  return (
    <main className={styles.pageLogin}>
      <h1 className={styles.pageLogin__title}>Sign In</h1>
      <div className={styles.pageLogin__form}>
        {isAuth ? (
          <Button
            type={'button'}
            onClick={handleButtonClick}
            caption={'Выйти'}
          />
        ) : (
          <LoginForm/>
        )}
      </div>
    </main>
  );
}