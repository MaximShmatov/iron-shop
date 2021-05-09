import {useSelector} from 'react-redux';
import {Link as LinkReactRouterDom, LinkProps} from 'react-router-dom';


export function Link(props: LinkProps) {
  const state = useSelector((state) => state);
  const {children, to, className} = props;

  const params = {
      pathname: to.toString(),
      search: `state=${JSON.stringify(state)}`,
  };

  return (
    <LinkReactRouterDom className={className} to={params}>
      {children}
    </LinkReactRouterDom>
  );
}
