import {StrictMode} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Snackbar} from './components/Snackbar/Snackbar';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import Index from './pages/Index/Index';
import Profile from './pages/Profile/Profile';
import News from './pages/News/News';
import SignIn from './pages/SignIn/SignIn';
import './App.sass';


const routes = [
  {path: '/index.html', Component: Index, exact: true},
  {path: '/profile.html', Component: Profile, exact: false},
  {path: '/news.html', Component: News, exact: false},
  {path: '/signin.html', Component: SignIn, exact: false},
];

export function App() {
  return (
    <StrictMode>
      <Snackbar/>
      <Header/>
      <Switch>
        {routes.map(({path, Component, exact}) =>
          <Route key={path} exact={exact} path={path}>
            <Component/>
          </Route>
        )}
      </Switch>
      <Footer/>
    </StrictMode>
  );
}