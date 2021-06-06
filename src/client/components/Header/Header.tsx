import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {modalWindowSlice} from '../ModalWindow/modalWindowSlice';
import {Nav} from '../Nav/Nav'
import {Button} from '../Button/Button';
import {SearchForm} from '../SearchForm/SearchForm';
import styles from './Header.module.sass';


export type THeaderProps = {
  className?: string;
};

export function Header({className}: THeaderProps) {
  const dispatch = useDispatch();
  const {setModalWindow} = modalWindowSlice.actions;

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.header__wrapper}>
        <Link to={'/'}>
          <img
            className={styles.header__logo}
            alt={'logotype'}
            src={'/logo.svg'}
          />
        </Link>
        <SearchForm
          className={styles.header__search}
          onSubmit={() => {}}
          placeholder={'Поиск по товарам'}
        />
        <div className={styles.header__buttons}>
          <Button
            className={styles.header__buttonsItem}
            type={'button'}
            variant={'texted'}
            icon="&#xebc8;"
            iconPosition={'top'}
            caption={'Корзина'}
          />
          <Button
            className={styles.header__buttonsItem}
            type={'button'}
            variant={'texted'}
            icon="&#xede7;"
            iconPosition={'top'}
            onClick={() => dispatch(setModalWindow('loginForm'))}
            caption={'Войти'}
          />
        </div>
        <Nav className={styles.header__nav}/>
      </div>
    </header>
  );
}