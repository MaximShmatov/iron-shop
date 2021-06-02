import {NestFactory} from '@nestjs/core';
import * as session from 'express-session';
import {AppModule} from './server/app.module';


const port = process.env.PORT || 3000;
const isProdMode = (process.env.NODE_ENV === 'production');

const sessionOptions = {
  name: 'iron_shop',
  secret: 'JR3HFN9B7YW44',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
  }
}

async function runServer() {
  const app = await NestFactory.create(AppModule);
  app.use(session(sessionOptions));

  if (isProdMode) return app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
  });

  return app;
}

export default runServer();