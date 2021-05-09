import {useRef} from 'react';


type TLineGraphSVGProps = {
  scaleSize: number
  maxX: number,
  maxY: number,
  from: number[][],
  to: number[][],
}

export function LineGraphSVG({from, to, maxX, maxY, scaleSize}: TLineGraphSVGProps) {
  const animateRef = useRef<SVGAnimationElement | null>(null);

  const heightViewBox = 300;
  const widthViewBox = 600;
  const offsetGraph = 25;
  const mapAxis = new Array(scaleSize).fill(0);

  const calcPointCoords = (xy: number[]) => {
    const x = Math.round((widthViewBox - offsetGraph) / maxX * xy[0] + offsetGraph);
    const y = Math.round(heightViewBox - (heightViewBox - offsetGraph) / maxY * xy[1] - offsetGraph);
    return [x, y];
  };

  const searchReg = /([0-9]+),([0-9]+),/g;
  const fromPoints = from.map(calcPointCoords).toString().replace(searchReg, '$1,$2 ');
  const toPoints = to.map(calcPointCoords).toString().replace(searchReg, '$1,$2 ');

  const xDashArray = mapAxis.map(() => `${(widthViewBox - offsetGraph) / scaleSize - 2},2`);
  const yDashArray = mapAxis.map(() => `2,${(heightViewBox - offsetGraph) / scaleSize - 2}`);

  mapAxis.pop();
  const xText = mapAxis.map((_, i) => ({
    key: `textX${i}`,
    x: (widthViewBox - offsetGraph) / scaleSize * (i + 1) + offsetGraph,
    y: heightViewBox,
    textAnchor: 'middle',
    children: Math.round(maxX / scaleSize) * (i + 1),
  }));

  const yText = mapAxis.map((_, i) => ({
    key: `textY${i}`,
    x: 0,
    y: heightViewBox - (heightViewBox - offsetGraph) / scaleSize * (i + 1) + 5 - offsetGraph,
    textAnchor: 'start',
    children: Math.round(maxY / scaleSize) * (i + 1),
  }));

  return (
    <svg
      viewBox={`0 0 ${widthViewBox} ${heightViewBox}`}
      key={Math.random()}
    >
      <defs>
        <marker
          id={'arrow'}
          viewBox={'0 0 10 10'}
          refX={'10'}
          refY={'5'}
          markerWidth={'1.5'}
          markerHeight={'1.5'}
          orient={'auto-start-reverse'}
          fill={'green'}>
          <path d={'M 0 0 L 10 5 L 0 10 z'}/>
        </marker>
        <marker
          id={'dot'}
          viewBox={'0 0 10 10'}
          refX={'5'}
          refY={'5'}
          markerWidth={'5'}
          markerHeight={'5'}>
          <circle cx={'5'} cy={'5'} r={'4'} fill={'red'}/>
        </marker>
      </defs>
      <polyline
        points={
          `${offsetGraph},0 ` +
          `${offsetGraph},${heightViewBox - offsetGraph} ` +
          `${widthViewBox},${heightViewBox - offsetGraph}`
        }
        stroke={'green'}
        strokeWidth={10}
        markerStart={'url(#arrow)'}
        markerEnd={'url(#arrow)'}
        strokeDasharray={yDashArray.join() + ',0,' + xDashArray.join()}
        fill={'none'}
      />
      <rect
        x={offsetGraph}
        y={0}
        width={widthViewBox - offsetGraph}
        height={heightViewBox - offsetGraph}
        stroke={'green'}
        strokeWidth={2}
        fill={'none'}
      />
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
          ref={animateRef}
          attributeName={'points'}
          to={toPoints}
          dur={'.7s'}
          fill={'freeze'}
        />
      </polyline>
      <g fill={'red'} fontWeight={'bold'} fontSize={17}>
        {[...xText, ...yText].map((props) => <text {...props} />)}
      </g>
      <text
        x={0}
        y={heightViewBox}
        fontSize={25}
        fontWeight={'bold'}
        fill={'red'}
      >
        {0}
      </text>
    </svg>
  );
}
