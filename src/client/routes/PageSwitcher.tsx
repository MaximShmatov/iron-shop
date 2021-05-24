import {FC, useEffect, useState} from 'react';
import {Switcher} from './Switcher';
import {routes} from './routes';


const getPages = async () => ({
  index: (await import('../pages/Index')).default,
  profile: (await import('../pages/Profile/Profile')).default,
  news: (await import('../pages/News/News')).default,
  login: (await import('../pages/Login/Login')).default,
});

const pageComponents = getPages();

export function PageSwitcher() {
  const [pages, setPages] = useState<null | Record<string, FC>>(null);

  useEffect(() => {
    pageComponents.then((pages) => {
      setPages(pages);
    });
  }, []);

  return pages && <Switcher routes={routes.pages} components={pages}/>;
}
