import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as ReactDOM from 'react-dom';
import About from '../src/client/components/About';

// @ts-ignore
export default function ReactRender(content, map, data) {
  //const newContent = ReactDOMServer.renderToString(<About />);
  // const hydrat = ReactDOM.hydrate(<About />, newConte);
  // @ts-ignore
  this.callback(null, content, map, data)
  console.log(content);
};