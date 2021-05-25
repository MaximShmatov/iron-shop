import {Navigation} from '../Navigation/Navigation';
import {routes} from '../../routes/routes';
import styles from './Header.module.sass';


export function Header() {
  return (
    <header className={`${styles.header}`}>
      <img className={styles.logo} alt={'logotype'} src={'favicon/logo192.png'}/>
      <input type={'checkbox'} className={styles.checkbox} id={'header_checkbox'}/>
      <label className={styles.button} htmlFor={'header_checkbox'}/>
      <nav className={styles.menu}>
        <Navigation routes={routes}/>
      </nav>
    </header>
  );
}