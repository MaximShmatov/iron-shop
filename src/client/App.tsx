import {StrictMode} from 'react';
import {Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {Snackbar} from './components/Snackbar/Snackbar';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {PageSwitcher} from './routes/PageSwitcher';
import './App.sass';


export function App({store}: {store: Store}) {
  return (
    <StrictMode>
      <Provider store={store}>
        <Snackbar/>
        <Header/>
        <PageSwitcher/>
        <Footer/>
      </Provider>
    </StrictMode>
  );
}