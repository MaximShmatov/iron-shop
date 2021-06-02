import {SyntheticEvent, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {TRoute} from '../../routes/routes';
import styles from './Menu.module.sass';


export type TMenuProps = {
  path: string;
  caption: string;
  routes?: TRoute[];
  className?: string;
};

export function Menu({path, caption, routes, className}: TMenuProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleNavLinkClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsChecked(!isChecked);
  }

  if (!!routes) return (
    <label
      className={`${styles.menu} ${className}`}
      onMouseLeave={() => setIsChecked(false)}
    >
      <input
        className={`${styles.menu__checkbox} hide`}
        type={'checkbox'}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <NavLink
        className={styles.menu__ref}
        activeClassName={styles.menu__refActive}
        to={path}
        onClick={handleNavLinkClick}
      >
        {caption}
        <span className={styles.menu__refExpand}/>
      </NavLink>
      <ul className={styles.menu__items}>
        {routes.map(({path, caption}) => (
          <li
            className={styles.menu__item}
            key={path}
          >
            <NavLink
              className={styles.menu__itemRef}
              activeClassName={styles.menu__itemRefActive}
              onClick={() => setIsChecked(false)}
              to={path}
            >
              {caption}
            </NavLink>
          </li>
        ))}
      </ul>
    </label>
  );

  return (
    <NavLink
      className={styles.menu__ref}
      activeClassName={styles.menu__refActive}
      to={path}
    >
      {caption}
    </NavLink>
  );
}