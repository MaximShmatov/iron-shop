import { FormEvent } from 'react';
import { Button } from '../Button/Button';
import styles from './SearchForm.module.sass';


export function SearchForm({ onsubmit }: {onsubmit: (keyword: string) => void}) {
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const inputElement = (event.target as HTMLFormElement).elements.namedItem('search') as HTMLInputElement;
    onsubmit(inputElement.value);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <input
        className={styles.input}
        name={'search'}
        type={'text'}
        placeholder={'Enter Keyword'}
      />
      <Button type={'submit'}>
        Search
      </Button>
    </form>
  );
}