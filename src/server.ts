declare const module: any;
import {NestFactory} from '@nestjs/core';
import {AppModule} from './server/app.module';
import {webpackDevMiddleware} from '../scripts/middleware';
import {webpackHotMiddleware} from '../scripts/middleware';


const port = process.env.PORT || 3000;

async function runServer() {
  const app = await NestFactory.create(AppModule);
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
  app.getHttpServer().keepAliveTimeout = 1;
  await app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

runServer();