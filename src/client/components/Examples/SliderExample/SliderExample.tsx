import {ControlPanel} from './ControlPanel';
import Slider from '../../Slider/Slider';
import styles from './SliderExample.module.sass'

export function SliderExample() {
  return (
    <div className={styles.sliderExample}>
      <div className={styles.sliderExample__controlPanel}>
        <ControlPanel/>
      </div>
      <div className={styles.sliderExample__box}>
        <Slider/>
      </div>
    </div>
  );
}