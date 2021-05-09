import {hydrate} from 'react-dom';
import {combineReducers, createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {rootReducer} from './redux/store';
import {App} from './App';


const rootElement = document.getElementById('root');
const rootStateStr = rootElement?.getAttribute('data-state');

if (rootStateStr) {
  const store = createStore(combineReducers(rootReducer.reducer), JSON.parse(rootStateStr));
  hydrate(
    <BrowserRouter forceRefresh={true}>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
    , document.getElementById('root')
  );
}




