import { renderToString } from 'react-dom/server';
import { App } from './App';
import { PageTpl } from './templates/PageTpl';
import {createElement} from 'react';

function html(){
  return '<!DOCTYPE html>' + renderToString(createElement(PageTpl, {title: 'Index'}));
  //   <PageTpl title={'Index'}>
  //     <App />
  //   </PageTpl>
  // );
}
export default html();