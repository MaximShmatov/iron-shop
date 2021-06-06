import {ReactElement, SyntheticEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoginForm} from '../LoginForm/LoginForm';
import {modalWindowSlice} from './modalWindowSlice';
import styles from './ModalWindow.module.sass';


const components: Record<string, ReactElement> = {
  loginForm: <LoginForm/>,
}

export function ModalWindow() {
  const dispatch = useDispatch();
  const {setModalWindow} = modalWindowSlice.actions;
  const {isOpenWindow, componentName} = useSelector(({modalWindow}) => modalWindow);

  useEffect(() => {
    if (isOpenWindow === undefined) {
      dispatch(setModalWindow(true));
    }
  }, [isOpenWindow])

  const handleTransitionEnd = () => {
    if (isOpenWindow === false) {
      dispatch(setModalWindow(null));
    }
  };

  const handleWindowClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const isModalWindow = event.target instanceof HTMLElement
      && event.target.className.indexOf(styles.modalWindow) >= 0;

    if (isModalWindow) {
      dispatch(setModalWindow(false));
    }
  };

  const classes = [
    styles.modalWindow,
    (isOpenWindow !== null) && styles.modalWindow_enabled,
    !!isOpenWindow ? styles.modalWindow_opened : styles.modalWindow_closed,
  ].filter(Boolean);

  return (
    <div
      className={classes.join(' ')}
      onMouseDown={handleWindowClick}
      onTransitionEnd={handleTransitionEnd}
    >
      {(isOpenWindow !== null) && components[componentName]}
    </div>
  );
}
