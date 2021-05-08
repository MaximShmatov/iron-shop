import styles from './Index.module.sass';
import {LineGraph} from '../../components/LineGraph/LineGraph';


export default function Index(props: any) {
  //  console.log(props);
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Index Page</h1>
      <LineGraph pointsAmount={15} maxX={500} maxY={50} scaleSize={10}/>
    </main>
  );
}