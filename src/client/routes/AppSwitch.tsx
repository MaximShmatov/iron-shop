import {useState, useEffect, FC} from 'react';
import {Route, Switch} from 'react-router-dom';
import {TRoute} from './routes';


const getPages = async () => ({
  index: (await import('../pages/Index/Index')).default,
  profile: (await import('../pages/Profile/Profile')).default,
  news: (await import('../pages/News/News')).default,
  login: (await import('../pages/Login/Login')).default,
});

export function AppSwitch({routes}: {routes: TRoute[]}) {
  const [routePages, setRoutePages] = useState<null | {path: string, Component: FC, exact: boolean}[]>(null);

  useEffect(() => {
    getPages().then((pages: Record<string, FC>) => {
      const components = routes.map(({path, page, exact}) => (
        !!pages[page] && {path, exact, Component: pages[page]}
      )).filter(Boolean);
      setRoutePages(components);
    });
  }, [routes]);


  return (
    <Switch>
      {routePages && routePages.map(({path, Component, exact}) =>
        <Route key={path} exact={exact} path={path}>
          <Component/>
        </Route>
      )}
    </Switch>
  );
}