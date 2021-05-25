import {SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';
import styles from './Navigation.module.sass';
import {TRoute} from '../../routes/routes';


export function Navigation({routes}: { routes: TRoute[] }) {
  const handleMouseLeaveSubMenu = (event: SyntheticEvent) => {
    (event.currentTarget.getElementsByClassName(styles.checkbox)[0] as HTMLInputElement).checked = false;
  };

  return (
    <ul className={`${styles.menu}`}>
      {routes.map(({path, caption, routes}) => (
        <li key={path} className={styles.link}>
          {(!/.html/.exec(path) && routes) ? (
            <label key={path} onMouseLeave={handleMouseLeaveSubMenu}>
              <input type={'checkbox'} className={styles.checkbox}/>
              <span className={`${styles.ref} ${styles.menuItem}`}>
                {caption}
              </span>
              <ul className={styles.subMenu}>
                {routes.map(({path, caption}) => (
                  <li key={path} className={styles.subMenuItem}>
                    <Link className={styles.ref} to={path}>{caption}</Link>
                  </li>
                ))}
              </ul>
            </label>
          ) : (
            <Link className={`${styles.ref} ${styles.menuItem}`} to={path}>{caption}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}