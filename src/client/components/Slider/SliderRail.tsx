import {useSelector} from 'react-redux';
import styles from './Slider.module.sass';

interface Props {
  moveFrom: number,
  moveTo: number,
  move: (evt: React.MouseEvent) => void,
  moveThumb: (evt: React.MouseEvent | MouseEvent) => void,
}

function SliderRail({move, moveThumb, moveFrom, moveTo}: Props) {
  const {
    valueFrom, valueTo, isRange, isVertical, hasTooltip,
  } = useSelector(({slider}) => slider)

  const handleMouseMove = (evt: MouseEvent) => {
    moveThumb(evt);
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  const handleMouseDown = (evt: React.MouseEvent) => {
    move(evt);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  const thumbFromStyle = {
    left: isVertical ? '0%' : `${moveFrom}%`,
    top: isVertical ? `${moveFrom}%` : '0%',
  };

  const thumbToStyle = {
    left: isVertical ? '0%' : `${moveTo}%`,
    top: isVertical ? `${moveTo}%` : '0%',
    display: isRange ? '' : 'none',
  };

  const tooltipStyle = {
    display: hasTooltip ? '' : 'none'
  };

  const progressStyle = {
    left: isVertical ? '0%' : `${moveFrom}%`,
    right: isVertical || !isRange ? '0%' : `${100 - moveTo}%`,
    top: isVertical ? `${moveFrom}%` : '0%',
    bottom: isVertical && isRange ? `${100 - moveTo}%` : '0%',
  };

  return (
    <div
      className={styles.slider__rail}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={styles.slider__thumb}
        style={thumbFromStyle}
      >
        <div
          className={styles.slider__thumbTooltip}
          style={tooltipStyle}
        >
          {valueFrom}
        </div>
      </div>
      <div
        className={styles.slider__thumb}
        style={thumbToStyle}
      >
        <div
          className={styles.slider__thumbTooltip}
          style={tooltipStyle}
        >
          {valueTo}
        </div>
      </div>
      <div
        className={styles.slider__progress}
        style={progressStyle}>
      </div>
    </div>
  );
}

export default SliderRail;