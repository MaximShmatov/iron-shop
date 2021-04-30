import {HashRouter, Route, Switch} from 'react-router-dom';
import {FC, lazy, ReactChildren, ReactElement, Suspense} from 'react';


export function ClientRouter({App}: { App: FC }) {
  const components = [
    {path: '/', src: './pages/Index/Index', exact: true},
    {path: '/profile', src: './pages/Profile/Profile', exact: false},
    {path: '/news', src: './pages/News/News', exact: false},
    {path: '/signin', src: './pages/SignIn/SignIn', exact: false},
  ];

  return (
    <HashRouter>
      <App>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {components.map(({path, src, exact}) =>
              <Route
                key={path}
                exact={exact}
                path={path}
                component={lazy(() => import(src))}/>
            )}
          </Switch>
        </Suspense>
      </App>
    </HashRouter>
  );
}