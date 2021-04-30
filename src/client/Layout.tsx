import {ReactElement, StrictMode} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';


export function Layout({children}: {children: ReactElement}) {
  return (
    <StrictMode>
      <Provider store={store}>
        {children}
      </Provider>
    </StrictMode>
  );
}