import {useMemo} from 'react';
import {PolylineSVG} from './PolylineSVG';
import {ScaleSVG} from './ScaleSVG';
import styles from './LineGraph.module.sass';
import {useRandomPoints} from './useRandomPoints';


export type TLineGraphProps = {
  maxPoints: number;
  maxX: number;
  maxY: number;
  scaleSize: number;
  className?: string;
};


export function LineGraph({maxPoints, maxX, maxY, scaleSize, className}: TLineGraphProps) {
  const [points, genPoints] = useRandomPoints({maxPoints, maxX, maxY});

  const scale = useMemo(
    () => <ScaleSVG scaleSize={scaleSize} maxX={maxX} maxY={maxY}/>,
    [scaleSize, maxX, maxY],
  );

  return (
    <div className={`${styles.lineGraph} ${className}`}>
      <pre className={styles.coordinates}>
        {points.points.map((item) => `[${item.toString()}]\n`)}
      </pre>
      <div className={styles.svg} onClick={genPoints}>
        <svg viewBox={'0 0 600 300'}>
          {scale}
          <PolylineSVG {...points} maxX={maxX} maxY={maxY}/>
        </svg>
      </div>
    </div>
  );
}