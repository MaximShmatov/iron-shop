import {ChangeEvent, ForwardedRef, forwardRef, useState} from 'react';
import styles from './TextInput.module.sass';


export type TTextInputProps = {
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: 'text' | 'password' | 'email';
  defaultValue?: string;
  className?: string;
  placeholder?: string;
};

export const TextInput = forwardRef((props: TTextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState('');

  const {
    onBlur, name, type, className, defaultValue, placeholder,
    onChange = (event) => setInputValue(event.target.value),
    value = inputValue,
  } = props;

  const inputProps = {value, onBlur, onChange, name, type, defaultValue, placeholder, ref};

  const classes = [
    styles.textInput,
    !!className && className,
  ].filter(Boolean);

  return (
    <input
      className={classes.join(' ')}
      {...inputProps}
      autoComplete={'off'}
    />
  );
});
