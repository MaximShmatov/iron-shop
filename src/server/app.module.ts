import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import {resolve} from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('build/public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}