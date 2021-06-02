import {useState} from 'react';
import {PolylineGraph} from '../../PolylineGraph/PolylineGraph';
import styles from './PolylineExample.module.sass';


export function PolylineExample() {
  const [points, setPoints] = useState([[0, 0]]);

  return (
    <div className={styles.polylineExample}>
      <pre className={styles.polylineExample__points}>
        {points.map((item) => `[${item.toString()}]\n`)}
      </pre>
      <div className={styles.polylineExample__graph}>
        <PolylineGraph
          maxPoints={16}
          maxX={500}
          maxY={50}
          scaleSize={10}
          genPointsCallback={setPoints}
        />
      </div>
    </div>
  );
}