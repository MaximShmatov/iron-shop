import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../redux/snackbarSlice';
import styles from './Snackbar.module.sass';


export function Snackbar() {
  const dispatch = useDispatch();
  const message = useSelector(({ snackbar }) => snackbar.message);

  if (!!message) {
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 1500);
  }

  return (
    <div className={styles.snackbar}>
      <span className={`${styles.message} ${!!message && styles.hideMessage}`}>
        {message}
      </span>
    </div>
  );
}