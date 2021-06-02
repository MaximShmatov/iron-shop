import {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setValueFrom, setValueTo} from './rangeSliderSlice';
import SliderScale from './SliderScale';
import SliderRail from './SliderRail';
import styles from './Slider.module.sass';

function Slider() {
  const {
    minValue, maxValue, valueFrom, valueTo, isVertical, isRange,
  } = useSelector(({slider}) => slider);

  const [clientRect, setClientRect] = useState({offsetXorY: 0, widthOrHeight: 0})

  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (railRef.current) {
      const rect = railRef.current.getBoundingClientRect();
      setClientRect({
        offsetXorY: isVertical ? rect.top : rect.left,
        widthOrHeight: isVertical ? rect.height : rect.width,
      });
    }
  }, [isVertical]);

  const calcMove = (thumbValue: number) => Math.round(
    Math.abs((minValue - thumbValue) / ((maxValue - minValue) / 100))
  );

  const moveFrom = calcMove(valueFrom);
  const moveTo = calcMove(valueTo);
  let isThumbTo = false;
  let clickOffset = 0

  const calcPosToPercent = (evt: MouseEvent | React.MouseEvent) => {
    const {offsetXorY, widthOrHeight} = clientRect;
    const clientXorY = isVertical ? evt.clientY : evt.clientX;
    const pos = (clientXorY - offsetXorY) / (widthOrHeight / 100);
    return (pos - clickOffset);
  }

  const handleMouseDown = (evt: React.MouseEvent | MouseEvent) => {
    const posInPercent = calcPosToPercent(evt);
    const distanceFrom = posInPercent - moveFrom;
    const distanceTo = posInPercent - moveTo;
    isThumbTo = isRange
      && (Math.abs(distanceFrom) > Math.abs(distanceTo)
        || (distanceFrom === distanceTo
          && ((valueFrom === minValue && valueTo === minValue)
            || posInPercent > moveFrom
          )
        )
      );
    const element = evt.target as HTMLElement;
    const isTooltipOrThumb = element.className === styles.slider__thumbTooltip
      || element.className === styles.slider__thumb;
    if (isTooltipOrThumb) {
      clickOffset = isThumbTo ? distanceTo : distanceFrom;
    }
    handleMouseMove(evt);
  }

  const dispatch = useDispatch();

  const handleMouseMove = (evt: MouseEvent | React.MouseEvent) => {
    evt.preventDefault();
    let posInPercent = calcPosToPercent(evt);
    if (posInPercent < 0) posInPercent = 0;
    if (posInPercent > 100) posInPercent = 100;
    const position = (posInPercent * ((maxValue - minValue) / 100) + minValue);
    const action = isThumbTo ? setValueTo(position) : setValueFrom(position);
    dispatch(action);
  };

  const classes = isVertical ? `${styles.slider} ${styles.slider_vertical}` : styles.slider;

  return (
    <div className={classes} ref={railRef}>
      <SliderRail
        moveFrom={moveFrom}
        moveTo={moveTo}
        move={handleMouseDown}
        moveThumb={handleMouseMove}
      />
      <SliderScale move={handleMouseDown}/>
    </div>
  );
}

export default Slider;