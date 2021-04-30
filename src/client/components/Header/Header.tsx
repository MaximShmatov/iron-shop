import { Link } from 'react-router-dom';
import styles from './Header.module.sass';

export function Header() {
  const links = [
    {path: '/', caption: 'Home'},
    {path: '/news', caption: 'News'},
    {path: '/profile', caption: 'Profile'},
    {path: '/signin', caption: 'Sign In'},
  ];

  return (
    <header className={styles.header}>
      <img className={styles.logo} alt="logotype" src="logo150.png"/>
      <input className={styles.checkbox} type={'checkbox'} id={styles.checkbox} />
      <label className={styles.button} htmlFor={styles.checkbox} />
      <nav className={styles.nav}>
        <ul className={styles.links}>
          {links.map(({ path, caption }) => (
            <li className={styles.link} key={Math.random()}>
              <Link className={styles.ref} to={path}>{caption}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}