type TRoute = {
  path: string;
  page: string;
  exact: boolean;
};

const routes = [
  {path: '/index.html', page: 'index', exact: false},
  {path: '/profile.html', page: 'profile', exact: false},
  {path: '/news.html', page: 'news', exact: false},
  {path: '/login.html', page: 'login', exact: false},
];

export {routes, TRoute}