import {renderToString} from 'react-dom/server';

module.exports = function (content:any) {
  // @ts-ignore
  console.log(renderToString(content));
  return content;
}