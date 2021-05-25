import {ReactElement} from 'react';
import {Route, Switch} from 'react-router-dom';
import {TRoute} from './routes';


type TSwitcherProps = {
  routes: TRoute[];
  components: Record<string, ReactElement>;
};

export function Switcher({routes, components}: TSwitcherProps) {
  const routeComponents = routes.map(({path, name, exact}) => (
    !!components[name] && {path, exact, Component: components[name]}
  )).filter(Boolean);

  return (
    <Switch>
      {!!routeComponents.length && routeComponents.map(({path, Component, exact}) =>
        <Route key={path} exact={exact} path={path}>
          {Component}
        </Route>
      )}
    </Switch>
  );
}