import {useState} from 'react';
import {routes} from '../../routes/routes';
import styles from './Nav.module.sass';
import {Menu} from '../Menu/Menu';
import {Checkbox} from '../Checkbox/Checkbox';


export type TNavProps = {
  className: string;
};

export function Nav({className}: TNavProps) {
  const [isChecked, setIsChecked] = useState(false);

  const rootClasses = [
    styles.nav,
    !!className && className,
  ].filter(Boolean);

  const menuClasses = [
    styles.nav__menu,
    isChecked && styles.nav__menu_checked,
  ].filter(Boolean);

  return (
    <nav className={rootClasses.join(' ')}>
      <Checkbox
        className={styles.nav__checkbox}
        icon="&#xeb58;"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        variant={'filled'}
      />
      <ul className={menuClasses.join(' ')}>
        {routes.map(({path, caption, routes}) => caption && (
          <li
            className={styles.nav__menuItem}
            key={path}
          >
            <Menu path={path} caption={caption} routes={routes}/>
          </li>
        ))}
      </ul>
    </nav>
  );
}