import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import About from '../src/client/components/about';

// @ts-ignore
export default function ReactRender(content, map, data) {
  const newContent = ReactDOM.renderToString(<About />);
  // @ts-ignore
  this.callback(null, content, map, data)
  console.log(newContent, content);
};