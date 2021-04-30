import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../redux/authSlice';
import { Button } from '../../components/Button/Button';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { Speedometer } from '../../components/Speedometer/Speedometer';
import styles from './SignIn.module.sass';


export default function SignIn() {
  const dispatch = useDispatch();
  const isAuth = useSelector(({ auth }) => auth.isAuth);

  const handleButtonClick = () => {
    dispatch(setIsAuth(false));
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Sign In</h1>
      <Speedometer className={styles.counter} scaleSize={50} />
      {!isAuth ? <AuthForm className={styles.form}/> : (
        <Button
          className={styles.button}
          type="button"
          onClick={handleButtonClick}
        >
          Logout
        </Button>
      )}
    </main>
  );
}