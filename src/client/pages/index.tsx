import * as React from 'react';
import {useState} from 'react';

import * as ReactDOM from 'react-dom';

const styles = {
  display: 'block',
  width: '300px',
  height: '40px',
  backgroundColor: 'red',
}

function Index() {
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
ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
export default Index;