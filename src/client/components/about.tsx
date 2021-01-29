import * as React from 'react';
import {useState} from 'react';


const styles = {
  display: 'block',
  width: '300px',
  height: '40px',
  backgroundColor: 'red',
}

export default function About() {
  const [state, setState] = useState(0);
  const handleButtonClick = () => {
    setState(state + 1)
  }
  console.log('react 1');
  const str = 'Hello World';
  return (
    <div>
      <h1 style={styles}>{str + state}</h1>
      <button
        type="button"
        onClick={handleButtonClick}
      >
        Ping
      </button>
    </div>
  );
}