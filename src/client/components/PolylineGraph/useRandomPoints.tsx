import {useState} from 'react';


export type TRandomPointsProps = {
  maxPoints: number;
  maxX: number;
  maxY: number;
};
export type TRandomPoints = [
  { from: number[][], to: number[][], generatedPoints: number[][] },
  () => void,
];
const getRandomAmountPoints = (maxPoints: number) => Math.round(Math.random() * maxPoints) || 1;
const getRandomPoint = (base: number) => Math.round((base / 100) * Math.random() * 100);
const getRandomPoints = (pointsAmount: number, maxX: number, maxY: number) => new Array(pointsAmount)
  .fill(0)
  .map(() => [getRandomPoint(maxX), getRandomPoint(maxY)])
  .sort((a, b) => a[0] - b[0]);


export function useRandomPoints({maxPoints, maxX, maxY}: TRandomPointsProps): TRandomPoints {
  const [points, setPoints] = useState(() => {
    const initPoints = new Array(maxPoints).fill([0, 0]);
    return {
      from: initPoints,
      to: initPoints,
      generatedPoints: initPoints
    };
  });

  const generatePoints = () => {
    const pointsTo = getRandomPoints(getRandomAmountPoints(maxPoints), maxX, maxY);
    const copyPointsTo = pointsTo.slice();
    const maxXValue = points.to[pointsTo.length - 1][0];

    const normalizedPointsTo = points.to.map((item, i) => {
      const isLastPointTo = pointsTo[0][0] <= item[0] || i === 0 || pointsTo[0][0] > maxXValue;
      if (pointsTo.length > 1 && isLastPointTo) {
        return pointsTo.shift() as number[];
      }
      return pointsTo[0];
    });

    setPoints({
      from: points.to,
      to: normalizedPointsTo,
      generatedPoints: copyPointsTo,
    });
  };

  return [points, generatePoints];
}