import {useEffect, useMemo} from 'react';
import {PolylineSVG} from './PolylineSVG';
import {ScaleSVG} from './ScaleSVG';
import {useRandomPoints} from './useRandomPoints';


export type TLineGraphProps = {
  maxPoints: number;
  maxX: number;
  maxY: number;
  scaleSize: number;
  genPointsCallback?: (points: number[][]) => void;
};

export function PolylineGraph({maxPoints, maxX, maxY, scaleSize, genPointsCallback}: TLineGraphProps) {
  const [points, generatePoints] = useRandomPoints({maxPoints, maxX, maxY});

  const scale = useMemo(() => (
      <ScaleSVG scaleSize={scaleSize} maxX={maxX} maxY={maxY}/>
    ), [scaleSize, maxX, maxY],
  );

  useEffect(() => {
    genPointsCallback?.(points.generatedPoints);
  }, [points]);

  return (
    <svg viewBox={'0 0 600 300'} onClick={generatePoints}>
      {scale}
      <PolylineSVG from={points.from} to={points.to} maxX={maxX} maxY={maxY}/>
    </svg>
  );
}