import {ImageSlider} from '../../components/ImageSlider/ImageSlider';
import {indexImages} from '../../components/ImageSlider/indexImages';
import styles from './Index.module.sass';


export default function Index() {
  return (
    <main className={styles.page}>
      <ImageSlider images={indexImages}/>
    </main>
  );
}