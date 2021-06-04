import {Button} from '../Button/Button';
import styles from './ImageSlider.module.sass'
import {useEffect, useState} from 'react';


export type THeaderProps = {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
};

export function ImageSlider({images, className}: THeaderProps) {
  const [topImageIndex, setTopImageIndex] = useState(0);

  const leftImageIndex = (topImageIndex === 0) ? images.length - 1 : topImageIndex - 1;
  const rightImageIndex = (topImageIndex === (images.length - 1)) ? 0 : topImageIndex + 1;

  const positionClasses = {
    [leftImageIndex]: styles.imageSlider__image_position_left,
    [topImageIndex]: styles.imageSlider__image_position_top,
    [rightImageIndex]: styles.imageSlider__image_position_right,
  };

  useEffect(() => {
    const cycleId = setInterval(() => {
      setTopImageIndex(rightImageIndex);
    }, 3000);
    return () => {
      clearInterval(cycleId);
    };
  }, [topImageIndex]);

  return (images.length < 2) ? null : (
    <div className={`${styles.imageSlider} ${className}`}>
      {images.map((item, i) => (
        <img
          className={`${styles.imageSlider__image} ${positionClasses[i] || ''}`}
          {...item}
          key={item.src}
        />
      ))}
      <div className={styles.imageSlider__control}>
        <Button
          icon="&#xea57;"
          variant={'bordered'}
          onClick={() => setTopImageIndex(leftImageIndex)}
        />
        <span className={styles.imageSlider__counter}>
          {`${topImageIndex + 1}/${images.length}`}
        </span>
        <Button
          icon="&#xea58;"
          variant={'bordered'}
          onClick={() => setTopImageIndex(rightImageIndex)}
        />
      </div>
    </div>
  );
}