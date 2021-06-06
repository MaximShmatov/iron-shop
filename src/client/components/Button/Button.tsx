import {SyntheticEvent} from 'react';
import styles from './Button.module.sass';


type TFlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
type TIconPosition = 'left' | 'right' | 'top' | 'bottom';
type TType = 'button' | 'submit' | 'reset';
type TVariant = 'texted' | 'filled' | 'bordered';

export type TButtonProps = {
  name?: string;
  type?: TType;
  variant?: TVariant;
  caption?: string;
  onClick?: (event: SyntheticEvent) => void;
  icon?: string;
  iconPosition?: TIconPosition;
  className?: string;
};

const variants: Record<TVariant, string> = {
  texted: styles.button_variant_texted,
  filled: styles.button_variant_filled,
  bordered: styles.button_variant_bordered,
};
const direction: Record<TIconPosition, TFlexDirection> = {
  top: styles.button_position_top,
  bottom: styles.button_position_bottom,
  left: styles.button_position_left,
  right: styles.button_position_right,
};

export function Button(props: TButtonProps) {
  const {
    name, type, onClick, icon, className, caption,
    variant = 'filled',
    iconPosition = 'left'
  } = props;
  const buttonProps = {name, type, onClick};

  const classes = [
    styles.button,
    direction[iconPosition],
    variants[variant],
    !!className && className,
  ].filter(Boolean);

  return (
    <button
      className={classes.join(' ')}
      {...buttonProps}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {caption}
    </button>
  );
}