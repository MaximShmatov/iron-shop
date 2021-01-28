import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const srv = await app.listen(port, () => {
    process.on('disconnect', () => srv.close());
    console.log(`Server listen port: ${port}`);
  });
}

bootstrap();