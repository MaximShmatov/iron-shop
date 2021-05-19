import {useEffect, useState} from 'react';
import {LineGraphSVG} from './LineGraphSVG';
import styles from './LineGraph.module.sass';


type TLineGraphProps = {
  maxPoints: number;
  maxX: number;
  maxY: number;
  scaleSize: number;
  className?: string;
};

export function LineGraph({maxPoints, maxX, maxY, scaleSize, className}: TLineGraphProps) {
  const [points, setPoints] = useState({from: [[0,0]], to: [[0,0]], pointsTo: [[0,0]]});
  const getRandomPoint = (base: number) => Math.round((base / 100) * Math.random() * 100);
  const getRandomPoints = (pointsAmount: number) => new Array(pointsAmount)
    .fill(0)
    .map(() => [getRandomPoint(maxX), getRandomPoint(maxY)])
    .sort((a, b) => a[0] - b[0]);

  useEffect(() => {
    const initPoints = getRandomPoints(maxPoints);
    setPoints({from: initPoints, to: initPoints, pointsTo: initPoints});
  }, [maxPoints])

  const getRandomAmountPoints = () => Math.round(Math.random() * maxPoints) || 1;

  const handleSVGClick = () => {
    const pointsTo = getRandomPoints(getRandomAmountPoints());
    const copyPointsTo = pointsTo.slice();
    const maxX = points.to[pointsTo.length - 1][0];

    const normalizedPointsTo = points.to.map((item, i) => {
      const isLastPointTo = pointsTo[0][0] <= item[0] || i === 0 || pointsTo[0][0] > maxX;
      if (pointsTo.length > 1 && isLastPointTo) {
        return pointsTo.shift() || [0,0];
      }
      return pointsTo[0];
    });

    setPoints({
      from: points.to,
      to: normalizedPointsTo,
      pointsTo: copyPointsTo,
    });
  };

  return (
    <div className={`${styles.lineGraph} ${className}`}>
      <pre className={styles.coordinates}>
        {points.pointsTo.map((item) => `[${item.toString()}]\n`)}
      </pre>
      <div className={styles.svg} onClick={handleSVGClick}>
        <LineGraphSVG
          from={points.from}
          to={points.to}
          maxX={maxX}
          maxY={maxY}
          scaleSize={scaleSize}
        />
      </div>
    </div>
  );
}