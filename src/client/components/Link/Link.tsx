import {SyntheticEvent} from 'react';
import {useSelector} from 'react-redux';
import {Link as LinkReactRouterDom, LinkProps, useLocation, useParams, useHistory, } from 'react-router-dom';


export function Link(props: LinkProps) {
  const state = useSelector((state) => state);
  const history = useHistory();
  const location = useLocation();
  const ssr = false;
  const {children, to, className} = props;

  const handleMouseClick = (event: SyntheticEvent) => {
    event.preventDefault();
    history.push({pathname: to.toString(), search: JSON.stringify(state)});
  }

  const params = () => {
    return {
      pathname: to.toString(),
      search,
    }
  };
  const search = `state=${JSON.stringify(state)}`

  return ssr ? (
    <a className={className} onMouseDown={handleMouseClick}>
      {children}
    </a>
  ) : (
    <LinkReactRouterDom className={className} to={params}>
      {children}
    </LinkReactRouterDom>
  );
}
