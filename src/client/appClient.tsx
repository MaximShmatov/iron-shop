import {hydrate} from 'react-dom';
import {getStore} from './store/store';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {Store} from '@reduxjs/toolkit';


const url = new URL(`${document.location.origin}/_app_state_`);

const appHydrate = (store: Store) => hydrate(
  <BrowserRouter forceRefresh={true}>
    <App store={store}/>
  </BrowserRouter>
  , document.getElementById('root')
);

fetch(url.href, {method: 'POST'})
  .then((res) => res.json())
  .then((state) => {
    const store = getStore(state);
    window.onbeforeunload = () => {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(store.getState()),
      };
      fetch(url.href, fetchOptions)
        .catch((error) => console.error(error.toString()));
    };
    appHydrate(store);
  })
  .catch((error) => {
    console.error(error.toString());
    appHydrate(getStore());
  });
