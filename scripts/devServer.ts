declare const module: {
  hot: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  };
};

import {INestApplication} from '@nestjs/common';
import server from '../src/server';
import {webpackDevMiddleware, webpackHotMiddleware} from './middleware';


const port = process.env.PORT || 3000;

server.then((app: INestApplication) => {
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
  app.getHttpServer().keepAliveTimeout = 1;
  app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
  }).then(() => {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  });
});




