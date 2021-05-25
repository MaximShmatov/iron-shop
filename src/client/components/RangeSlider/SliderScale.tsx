import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Slider.module.sass';

function SliderScale({move}: { move: (evt: React.MouseEvent) => void }) {
  const {minValue, maxValue, hasScale} = useSelector(({slider}) => slider);
  const range = maxValue - minValue;
  const rangeItemValue = minValue + range / 3;
  const secondItemValue = (range >= 2) ? rangeItemValue.toFixed() : null;
  const thirdItemValue = (range >= 3) ? (rangeItemValue * 2).toFixed() : null;

  return (
    <div
      className={styles.slider__scale}
      style={{display: hasScale ? '' : 'none'}}
      onMouseDown={evt => move(evt)}
    >
      <div className={styles.slider__scaleWrapper}>
        {[1, 2, 3].map(() => (
          <div className={styles.slider__scaleDivision} key={Math.random()}>
            {[1, 2, 3, 4, 5].map(() => (
              <span className={styles.slider__scaleSubdivision} key={Math.random()}/>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.slider__scaleValues}>
        {[minValue, secondItemValue, thirdItemValue, maxValue].map((item) => (
          <span className={styles.slider__scaleValuesItem} key={Math.random()}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SliderScale;

