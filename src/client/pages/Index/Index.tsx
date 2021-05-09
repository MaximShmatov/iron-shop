import {LineGraph} from '../../components/LineGraph/LineGraph';
import styles from './Index.module.sass';


export default function Index() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Index Page1</h1>
      <LineGraph pointsAmount={15} maxX={500} maxY={50} scaleSize={10}/>
    </main>
  );
}