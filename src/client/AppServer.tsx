import {StaticRouter} from 'react-router-dom';
import {Store} from '@reduxjs/toolkit';
import {App} from './App';

type TPageProps = {
  title: string,
  location: string,
  store: Store,
};

export function AppServer({title, store, location}: TPageProps) {
  return (
    <html lang="ru" dir="ltr">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      <meta name="theme-color" content="#000000"/>
      <meta name="keywords" content="IT, ИТ, автоматизация"/>
      <meta name="description" content="Обзор ИТ-индустрии"/>

      <link rel="icon" href="favicon/favicon.ico"/>
      <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>

      <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5"/>
      <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png"/>

      <meta name="msapplication-TileColor" content="#da532c"/>

      <link rel="manifest" href="favicon/manifest.json"/>

      <title>{title}</title>
    </head>
    <body>
    <div id="root">
      <StaticRouter location={location} context={{}}>
        <App store={store}/>
      </StaticRouter>
    </div>
    <script defer src="js/react.js"/>
    <script defer src="js/react-dom.js"/>
    <script defer src="js/index.js"/>
    </body>
    </html>
  );
}
