import {Switcher} from '../../routes/Switcher';
import {routes, TRoute} from '../../routes/routes';
import {SliderExample} from '../../components/Examples/SliderExample/SliderExample';
import {PolylineExample} from '../../components/Examples/PolylineExample/PolylineExample';
import {SpeedExample} from '../../components/Examples/SpeedometerExample/SpeedExample';
import styles from './Catalog.module.sass';


const propsSwitch = {
  components: {
    polyline: <PolylineExample/>,
    slider: <SliderExample/>,
    speedometer: <SpeedExample/>,
  },
  routes: routes.filter(({name}) => name === 'catalog')[0].routes as TRoute[],
};

export default function Catalog() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог</h1>
      <Switcher {...propsSwitch}/>
    </main>
  );
}