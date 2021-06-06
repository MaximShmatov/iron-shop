import {ChangeEvent, ForwardedRef, forwardRef, useState} from 'react';
import styles from './Checkbox.module.sass';

type TVariant = 'filled';
export type TCheckboxProps = {
  icon?: string;
  caption?: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  name?: string;
  defaultValue?: string;
  className?: string;
  variant?: TVariant;
};

const variants: Record<TVariant, string> = {
  filled: styles.checkbox_variant_filled,
};

export const Checkbox = forwardRef((props: TCheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    onBlur, name, className, defaultValue, icon, caption, variant,
    onChange = () => setIsChecked(!isChecked),
    checked = isChecked,
  } = props;

  const checkboxProps = {checked, onBlur, onChange, name, defaultValue, ref};

  const classes = [
    styles.checkbox,
    !!className && className,
    !!variant && variants[variant],
    'no-select'
  ].filter(Boolean);

  return (
    <label className={classes.join(' ')}>
      <input
        className={styles.checkbox__input + ' hide'}
        type={'checkbox'}
        {...checkboxProps}
      />
      <div className={styles.checkbox__icon}>
        {icon}
      </div>
      {!!caption && <span className={styles.checkbox__caption}>{caption}</span>}
    </label>
  );
});
