import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env.PORT || 3000


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
    process.on('disconnect', () => {
      app.close();
    });
  });
}

bootstrap();