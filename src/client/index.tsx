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
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
    , document.getElementById('root')
  );
}
//
// function Renderer({children}: {children: ReactElement}) {
//   const state = useSelector((state) => state);
//   console.log(state);
//
//     fetch('http://localhost:3000/state', {
//     method: 'POST',
//       body: JSON.stringify(state),
//       headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//   });
//
//
//   return children;
// }


// const state = JSON.parse(localStorage.getItem('state') as string);
// const newStore = createStore(combineReducers(rootReducer.reducer), state);
//
// fetch('http://localhost:3000/state', {
//   method: 'POST',
//   body: JSON.stringify(newStore.getState()),
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
// })
//   .then(res => res.json())
//   .then((rootState) => {
//
//     console.log(state)
//
//
//     hydrate(
//       <BrowserRouter forceRefresh={true}>
//         <Provider store={newStore}>
//           <App/>
//         </Provider>
//       </BrowserRouter>
//       , document.getElementById('root')
//     );
//   });




