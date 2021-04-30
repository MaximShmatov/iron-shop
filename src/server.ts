declare const module: any;
import { NestFactory } from '@nestjs/core';
import {AppModule} from './server/app.module';

const port = process.env.PORT || 3000;
const isProductionMode = (process.env.NODE_ENV === 'production');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (isProductionMode) {
    await app.listen(port, () => {
      console.log(`Server listen port: ${port}`);
    });
  } else {
    module.hot.accept();
    return app;
  }
}

export default bootstrap();