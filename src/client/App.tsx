import {ReactElement} from 'react';
import {Snackbar} from './components/Snackbar/Snackbar';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import React = require('react');
import './App.sass';


export function App({children}: { children: ReactElement }) {
  return (
    <>
      <Snackbar/>
      <Header/>
      {children}
      <Footer/>
    </>
  );
}