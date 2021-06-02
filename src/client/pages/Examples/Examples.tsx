import {Switcher} from '../../routes/Switcher';
import {routes, TRoute} from '../../routes/routes';
import {SliderExample} from '../../components/Examples/SliderExample/SliderExample';
import {PolylineExample} from '../../components/Examples/PolylineExample/PolylineExample';
import {SpeedExample} from '../../components/Examples/SpeedometerExample/SpeedExample';
import styles from './Examples.module.sass';


const propsSwitch = {
  components: {
    polyline: <PolylineExample/>,
    slider: <SliderExample/>,
    speedometer: <SpeedExample/>,
  },
  routes: routes.filter(({name}) => name === 'examples')[0].routes as TRoute[],
};

export default function Examples() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Examples</h1>
      <Switcher {...propsSwitch}/>
    </main>
  );
}