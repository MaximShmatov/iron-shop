import styles from './Index.module.sass';
import {Switcher} from '../../routes/Switcher';
import {routes, TRoute} from '../../routes/routes';
import {LineGraph} from '../../components/LineGraph/LineGraph';


const propsSwitch = {
  components: {
    polyline: <LineGraph maxPoints={16} maxX={500} maxY={50} scaleSize={10}/>,
  },
  routes: routes.filter(({name}) => name === 'index')[0].routes as TRoute[],
};

export default function Index() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Index Page</h1>
      <Switcher {...propsSwitch}/>
    </main>
  );
}