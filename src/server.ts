import {NestFactory} from '@nestjs/core';
import {AppModule} from './server/app.module';


const port = process.env.PORT || 3000;
const isProdMode = (process.env.NODE_ENV === 'production');

async function runServer() {
  const app = await NestFactory.create(AppModule);

  if (isProdMode) return app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
  });

  return app;
}

export default runServer();