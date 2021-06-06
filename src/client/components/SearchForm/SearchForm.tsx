import {FormEvent, useState} from 'react';
import {Button} from '../Button/Button';
import styles from './SearchForm.module.sass';


export type TSearchFormProps = {
  onSubmit: (arg: string) => void;
  className?: string;
  placeholder?: string;
};

export function SearchForm({placeholder, className, onSubmit}: TSearchFormProps) {
  const [searchString, setSearchString] = useState('');
  const [isFullWidth, setIsFullWidth] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchString !== '') {
      onSubmit(searchString);
      setSearchString('');
    } else {
      setIsFullWidth(!isFullWidth);
    }
  };

  return (
    <form
      className={`${styles.searchForm} ${className}`}
      onSubmit={handleFormSubmit}
    >
      <input
        className={`${styles.searchForm__input} ${isFullWidth && styles.searchForm__input_size_fullWidth}`}
        name={'search'}
        type={'text'}
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
        placeholder={placeholder}
      />
      <Button
        className={styles.searchForm__button}
        variant={'texted'}
        type={'submit'}
        icon="&#xec15;"
      />
    </form>
  );
}