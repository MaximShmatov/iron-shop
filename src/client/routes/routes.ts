export type TRoute = {
  path: string;
  name: string;
  caption: string;
  exact: boolean;
  routes?: TRoute[];
};

export const routes = [
  {
    path: '/index',
    name: 'index',
    caption: 'Компоненты',
    exact: false,
    routes: [
      {
        path: '/index/polyline',
        name: 'polyline',
        caption: 'Ломаная линия',
        exact: true,
      },
      {
        path: '/index/speedometer',
        name: 'speedometer',
        caption: 'Спидометр',
        exact: true,
      },
      {
        path: '/index/slider',
        name: 'slider',
        caption: 'Слайдер диапазона',
        exact: true,
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    caption: 'Профиль',
    exact: true,
  },
  {
    path: '/news',
    name: 'news',
    caption: 'Новости',
    exact: true,
  },
  {
    path: '/login',
    name: 'login',
    caption: 'Войти',
    exact: true,
  },
];