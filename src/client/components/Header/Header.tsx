import {Nav} from '../Nav/Nav'
import {Button} from '../Button/Button';
import {SearchForm} from '../SearchForm/SearchForm';
import styles from './Header.module.sass';


export type THeaderProps = {
  className?: string;
};

export function Header({className}: THeaderProps) {
  return (
    <header className={`${styles.header} ${className}`}>
      <img
        className={styles.header__logo}
        alt={'logotype'}
        src={'/logo.svg'}
      />
      <SearchForm
        className={styles.header__search}
        onSubmit={() => {}}
        placeholder={'Поиск по товарам'}
      />
      <div className={styles.header__buttons}>
        <Button
          className={styles.header__buttonsItem}
          type={'button'}
          variant={'transparent'}
          icon="&#xebc8;"
          iconPosition={'top'}
        >
          Корзина
        </Button>
        <Button
          className={styles.header__buttonsItem}
          type={'button'}
          variant={'transparent'}
          icon="&#xede7;"
          iconPosition={'top'}
        >
          Войти
        </Button>
      </div>
      <Nav className={styles.header__nav}/>
    </header>
  );
}