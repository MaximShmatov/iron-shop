import styles from './Button.module.sass';


type TFlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
type TIconPosition = 'left' | 'right' | 'top' | 'bottom';
type TType = 'button' | 'submit' | 'reset';
type TVariant = 'transparent' | 'filled' | 'bordered' | 'borderedDown';

export type TButtonProps = {
  type?: TType;
  variant?: TVariant;
  children?: string;
  onClick?: () => void;
  icon?: string;
  iconPosition?: TIconPosition;
  className?: string;
};

const variants: Record<TVariant, string> = {
  transparent: styles.button_variant_transparent,
  filled: styles.button_variant_filled,
  bordered: styles.button_variant_bordered,
  borderedDown: styles.button_variant_borderedDown,
};
const direction: Record<TIconPosition, TFlexDirection> = {
  top: styles.button_position_top,
  bottom: styles.button_position_bottom,
  left: styles.button_position_left,
  right: styles.button_position_right,
};

export function Button(props: TButtonProps) {
  const {type, children, onClick, variant = 'filled', icon, iconPosition = 'left', className} = props;

  const classes = styles.button
    + ' ' + direction[iconPosition]
    + ' ' + variants[variant]
    + ' ' + className;

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {children}
    </button>
  );
}