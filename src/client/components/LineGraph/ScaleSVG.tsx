import {ReactElement} from 'react';

export type TScaleSVGProps = {
  scaleSize: number
  maxX: number,
  maxY: number,
  children?: ReactElement,
}

export function ScaleSVG({maxX, maxY, scaleSize, children}: TScaleSVGProps) {
  const heightViewBox = 300;
  const widthViewBox = 600;
  const offsetGraph = 25;
  const mapAxis = new Array(scaleSize).fill(0);
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
    <svg viewBox={`0 0 ${widthViewBox} ${heightViewBox}`}>
      <defs>
        <marker
          id={'arrow'}
          viewBox={'0 0 10 10'}
          refX={10}
          refY={5}
          markerWidth={1.5}
          markerHeight={1.5}
          orient={'auto-start-reverse'}
          fill={'green'}>
          <path d={'M 0 0 L 10 5 L 0 10 z'}/>
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
      {children}
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
