import {useState} from 'react';
import {Button} from '../Button/Button';
import {routes} from '../../routes/routes';
import styles from './Nav.module.sass';
import {Menu} from '../Menu/Menu';


export type TNavProps = {
  className: string;
};

export function Nav({className}: TNavProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <nav className={`${styles.nav} ${className}`}>
      <input
        className={`${styles.nav__checkbox} hide`}
        type={'checkbox'}
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
      />
      <Button
        className={styles.nav__button}
        type={'button'}
        variant={isChecked ? 'borderedDown' : 'bordered'}
        icon="&#xeb58;"
        onClick={() => setIsChecked(!isChecked)}
      />
      <ul className={styles.nav__menu}>
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