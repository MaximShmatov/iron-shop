export type TRoute = {
  path: string;
  name: string;
  caption?: string;
  exact: boolean;
  routes?: TRoute[];
};

export const routes = [
  {
    path: '/',
    name: 'index',
    exact: true,
  },
  {
    path: '/index',
    name: 'index',
    caption: 'О магазине',
    exact: true,
  },
  {
    path: '/catalog',
    name: 'catalog',
    caption: 'Каталог',
    exact: true,
    routes: [
      {
        path: '/catalog/monitor',
        name: 'monitor',
        caption: 'Мониторы',
        exact: true,
      },
      {
        path: '/catalog/cpu',
        name: 'cpu',
        caption: 'Процессоры',
        exact: true,
      },
      {
        path: '/catalog/cooling',
        name: 'cooling',
        caption: 'Системы охлаждения',
        exact: true,
      },
      {
        path: '/catalog/ram',
        name: 'ram',
        caption: 'Модули памяти',
        exact: true,
      },
      {
        path: '/catalog/motherboard',
        name: 'motherboard',
        caption: 'Материнские платы',
        exact: true,
      },
      {
        path: '/catalog/gpu',
        name: 'gpu',
        caption: 'Видеокарты',
        exact: true,
      },
      {
        path: '/catalog/store',
        name: 'store',
        caption: 'Жесткие диски',
        exact: true,
      },
      {
        path: '/catalog/devices',
        name: 'devices',
        caption: 'Устройства ввода',
        exact: true,
      },
    ],
  },
  {
    path: '/delivery',
    name: 'delivery',
    caption: 'Доставка',
    exact: true,
  },
  {
    path: '/promotions',
    name: 'promotions',
    caption: 'Акции',
    exact: true,
  },
  {
    path: '/news',
    name: 'news',
    caption: 'Новости',
    exact: true,
  },
  {
    path: '/examples',
    name: 'examples',
    caption: 'Компоненты',
    exact: false,
    routes: [
      {
        path: '/examples/polyline',
        name: 'polyline',
        caption: 'Polyline',
        exact: true,
      },
      {
        path: '/examples/speedometer',
        name: 'speedometer',
        caption: 'Speedometer',
        exact: true,
      },
      {
        path: '/examples/slider',
        name: 'slider',
        caption: 'Range Slider',
        exact: true,
      },
      {
        path: '/examples/box',
        name: 'box',
        caption: 'Box',
        exact: true,
      },
    ],
  },
];