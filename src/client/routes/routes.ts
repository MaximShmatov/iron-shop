export type TRoute = {
  path: string;
  name: string;
  exact: boolean;
};

export const routes = {
  pages: [
    {path: '/index.html', name: 'index', exact: false},
    {path: '/profile.html', name: 'profile', exact: false},
    {path: '/news.html', name: 'news', exact: false},
    {path: '/login.html', name: 'login', exact: false},
  ]
};