import * as React from 'react';
import * as ReactDOM from 'react-dom';
import About from '../components/about';

ReactDOM.hydrate(
  <React.StrictMode>
    <About />
  </React.StrictMode>,
  document.getElementById('root')
);