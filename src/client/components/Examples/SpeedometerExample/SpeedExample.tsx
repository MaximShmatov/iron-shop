import {useState} from 'react';
import {Speedometer} from '../../Speedometer/Speedometer';
import {Button} from '../../Button/Button';
import styles from './SpeedExample.module.sass';


export function SpeedExample() {
  const [counter, setCounter] = useState(0);

  return (
    <div className={styles.speedExample}>
      <Button onClick={() => setCounter(counter + 1)}>
        Step on the gas!
      </Button>
      <div className={styles.speedExample__speedometer}>
        <Speedometer scaleSize={50} counter={counter}/>
      </div>
    </div>
  );
}