import * as React from 'react';

export default function Layout(children: React.Component) {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
}