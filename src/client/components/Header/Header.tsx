import {Link} from 'react-router-dom';
import styles from './Header.module.sass';


const links = [
  {path: '/index.html', caption: 'Home'},
  {path: '/news.html', caption: 'News'},
  {path: '/profile.html', caption: 'Profile'},
  {path: '/login.html', caption: 'Sign In'},
];

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} alt="logotype" src="favicon/logo192.png"/>
      <input className={styles.checkbox} type={'checkbox'} id={styles.checkbox}/>
      <label className={styles.button} htmlFor={styles.checkbox}/>
      <nav className={styles.nav}>
        <ul className={styles.links}>
          {links.map(({path, caption}) => (
            <li className={styles.link} key={Math.random()}>
              <Link className={styles.ref} to={path}>{caption}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}