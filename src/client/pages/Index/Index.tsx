import {LineGraph} from '../../components/LineGraph/LineGraph';
import styles from './Index.module.sass';


export default function Index() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Index Page</h1>
      <LineGraph maxPoints={16} maxX={500} maxY={50} scaleSize={10}/>
    </main>
  );
}