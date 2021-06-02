export type TSpeedometerProps = {
  scaleSize: number;
  counter: number;
};

export function Speedometer({scaleSize, counter}: TSpeedometerProps) {
  const lightScaleSize = (counter > scaleSize) ? scaleSize : counter;
  const darkScaleSize = scaleSize - lightScaleSize;
  const heightViewBox = 250;
  const widthViewBox = 300;

  const centerX = widthViewBox / 2;
  const radius = widthViewBox / 100 * 40;
  const circleLength = 2 * Math.PI * radius;
  const innerCircleLength = 2 * Math.PI * (radius / 1.2);
  const divisionSectorLength = circleLength / 3 * 2;
  const dimensionLength = divisionSectorLength / scaleSize;
  const dashLength = dimensionLength / 4;
  const divisionLength = dashLength * 3;
  const emptySectorLength = circleLength - divisionSectorLength;

  const calcEmptySector = (scaleSize: number) => emptySectorLength + dimensionLength * scaleSize + dashLength;
  const dashArrayDarkScale = new Array(scaleSize - lightScaleSize)
    .fill(`${divisionLength} ${dashLength}`);
  dashArrayDarkScale[dashArrayDarkScale.length - 1] = `${divisionLength} ${calcEmptySector(lightScaleSize)}`;
  const dashArrayLightScale = new Array(scaleSize - darkScaleSize)
    .fill(`${divisionLength} ${dashLength}`);
  dashArrayLightScale[dashArrayLightScale.length - 1] = `${divisionLength} ${calcEmptySector(darkScaleSize)}`;
  const dashArrayInnerScale = new Array(8)
    .fill(`${dashLength} 45.4`);
  dashArrayInnerScale.push(`${dashLength} ${innerCircleLength / 3}`);
  const dimensionRadian = 1 / (radius / dimensionLength);
  const arrowRadian = dimensionRadian * darkScaleSize - (dimensionRadian * 6);

  return (
    <svg viewBox={`0 0 ${widthViewBox} ${heightViewBox}`}>
      {!!darkScaleSize && <circle
        cx={centerX}
        cy={centerX}
        r={radius}
        stroke={'rgb(15 100 30)'}
        strokeWidth={28}
        strokeDasharray={dashArrayDarkScale.toString()}
        strokeDashoffset={-dimensionLength * lightScaleSize - 317}
        fill={'none'}
      />}
      <circle
        cx={centerX}
        cy={centerX}
        r={radius / 1.2}
        stroke={'black'}
        strokeWidth={dashLength}
        strokeDasharray={`${innerCircleLength / 3 * 2} ${innerCircleLength / 3}`}
        strokeDashoffset={-263}
        fill={'none'}
      />
      <circle
        cx={centerX}
        cy={centerX}
        r={radius / 1.3}
        stroke={'black'}
        strokeWidth={radius / 8}
        strokeDasharray={dashArrayInnerScale.toString()}
        transform={'rotate(150.5 150 150)'}
        fill={'none'}
      />
      {!!lightScaleSize && <circle
        cx={centerX}
        cy={centerX}
        r={radius}
        stroke={'rgb(53 248 4)'}
        strokeWidth={28}
        strokeDasharray={dashArrayLightScale.toString()}
        strokeDashoffset={-317}
        filter={'drop-shadow(0 0 10px #33ff00)'}
        fill={'none'}
      />}
      <line
        x1={centerX}
        y1={centerX}
        x2={Math.abs(widthViewBox / 2 + radius / 1.25 * Math.cos(arrowRadian))}
        y2={Math.abs(widthViewBox / 2 - radius / 1.25 * Math.sin(arrowRadian))}
        stroke={'red'}
        strokeWidth={divisionLength / 3 * 2}
      />
      <circle
        cx={centerX}
        cy={centerX}
        r={30}
        stroke={'grey'}
        strokeWidth={5}
        fill={'darkgrey'}
      />
      <text
        x={centerX}
        y={centerX + 10}
        fontSize={30}
        fontWeight={'bold'}
        textAnchor={'middle'}
        fill={'#17b517'}
      >
        {lightScaleSize}
      </text>
    </svg>
  );
}