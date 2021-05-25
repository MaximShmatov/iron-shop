import {StrictMode} from 'react';
import {Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import Index from './pages/Index/Index';
import Profile from './pages/Profile/Profile';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import {routes} from './routes/routes';

import {Snackbar} from './components/Snackbar/Snackbar';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {Switcher} from './routes/Switcher';
import './App.sass';

const pages = {
  index: <Index />,
  profile: <Profile />,
  news: <News />,
  login: <Login />,
};

export function App({store}: {store: Store}) {
  return (
    <StrictMode>
      <Provider store={store}>
        <Snackbar/>
        <Header/>
        <Switcher routes={routes} components={pages}/>
        <Footer/>
      </Provider>
    </StrictMode>
  );
}