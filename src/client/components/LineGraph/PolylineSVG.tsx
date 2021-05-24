export type TLineSVGProps = {
  maxX: number;
  maxY: number;
  from: number[][];
  to: number[][];
}


export function PolylineSVG({from, to, maxX, maxY}: TLineSVGProps) {
  const offsetGraph = 25;
  const widthViewBox = 600;
  const heightViewBox = 300;

  const calcPointCoords = (xy: number[]) => {
    const x = Math.round((widthViewBox - offsetGraph) / maxX * xy[0] + offsetGraph);
    const y = Math.round(heightViewBox - (heightViewBox - offsetGraph)/ maxY * xy[1] - offsetGraph);
    return [x, y];
  };

  const searchReg = /([0-9]+),([0-9]+),/g;
  const fromPoints = from.map(calcPointCoords).toString().replace(searchReg, '$1,$2 ');
  const toPoints = to.map(calcPointCoords).toString().replace(searchReg, '$1,$2 ');

  return (
    <svg
      viewBox={`0 0 ${widthViewBox} ${heightViewBox}`}
      key={Math.random()}
    >
      <defs>
        <marker
          id={'dot'}
          viewBox={'0 0 10 10'}
          refX={5}
          refY={5}
          markerWidth={5}
          markerHeight={5}>
          <circle
            cx={5}
            cy={5}
            r={5}
            fill={'red'}
          />
        </marker>
      </defs>
      <polyline
        points={fromPoints}
        stroke={'red'}
        strokeWidth={2}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        markerStart={'url(#dot)'}
        markerMid={'url(#dot)'}
        markerEnd={'url(#dot)'}
        fill={'none'}
      >
        <animate
          attributeName={'points'}
          to={toPoints}
          dur={'.7s'}
          fill={'freeze'}
        />
      </polyline>
    </svg>
  );
}
