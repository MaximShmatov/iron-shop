import * as React from 'react';
import {useState} from 'react';
import Layout from './Layout';

export default function About() {
  const styles = {
    display: 'block',
    width: '300px',
    height: '40px',
    backgroundColor: 'red',
  }
  const [state, setState] = useState(0);
  const handleButtonClick = () => {
    setState(state + 1)
  }
  const str = 'Hello W7orld ';
  return (
    <>
      <Layout />
      <h1 style={styles}>{str + state}</h1>
      <button
        type="button"
        onClick={handleButtonClick}
      >
        Ping
      </button>
    </>
  );
}