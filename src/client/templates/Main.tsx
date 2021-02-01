import * as React from 'react';
import {renderToString} from 'react-dom/server';

export default function template(fileName: string) {
  return import(`../pages/${fileName}`).then(Page => (
    `<!DOCTYPE html>
    <html lang="ru" dir="ltr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content="IT, ИТ, автоматизация" />
        <meta name="description" content="Обзор ИТ-индустрии" />
    
        <link rel="icon" href="favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
    
        <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
    
        <meta name="msapplication-TileColor" content="#da532c" />
    
        <link rel="manifest" href="favicon/manifest.json" />
    
        <title>Iron Shop</title>
      </head>
      <body>
        <div id="root">${renderToString(<Page.default/>)}</div>
      </body>
      
    </html>`
  ));
}
