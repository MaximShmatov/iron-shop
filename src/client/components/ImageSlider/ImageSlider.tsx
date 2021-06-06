import {useEffect, useState} from 'react';
import {Button} from '../Button/Button';
import styles from './ImageSlider.module.sass';


export type THeaderProps = {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
};

export function ImageSlider({images, className}: THeaderProps) {
  const [isEndTransition, setIsEndTransition] = useState(true);
  const [topImageIndex, setTopImageIndex] = useState(0);

  const leftImageIndex = (topImageIndex === 0) ? images.length - 1 : topImageIndex - 1;
  const rightImageIndex = (topImageIndex === (images.length - 1)) ? 0 : topImageIndex + 1;

  const positionClasses = {
    [leftImageIndex]: styles.imageSlider__image_position_left,
    [topImageIndex]: styles.imageSlider__image_position_top,
    [rightImageIndex]: styles.imageSlider__image_position_right,
  };

  useEffect(() => {
    const cycleId = setTimeout(() =>
      requestAnimationFrame(() => setTopImageIndex(rightImageIndex)), 5000);
    return () => {
      clearInterval(cycleId);
    };
  }, [topImageIndex]);

  const setImageIndex = (index: number) => {
    if (isEndTransition) {
      setIsEndTransition(false);
      setTopImageIndex(index);
    }
  };

  const classes = [
    styles.imageSlider,
    !!className && className
  ].filter(Boolean);

  return (images.length < 2) ? null : (
    <div className={classes.join(' ')}>
      {images.map((item, i) => (
        <img
          className={`${styles.imageSlider__image} ${positionClasses[i] || ''}`}
          {...item}
          key={item.src}
          onTransitionEnd={() => setIsEndTransition(true)}
        />
      ))}
      <div className={styles.imageSlider__control}>
        <Button
          icon="&#xea57;"
          variant={'bordered'}
          onClick={() => setImageIndex(leftImageIndex)}
        />
        <span className={styles.imageSlider__counter}>
          {`${topImageIndex + 1}/${images.length}`}
        </span>
        <Button
          icon="&#xea58;"
          variant={'bordered'}
          onClick={() => setImageIndex(rightImageIndex)}
        />
      </div>
    </div>
  );
}