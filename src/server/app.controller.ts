import {Controller, Res, Get, Post, Body, Param, Session, Next} from '@nestjs/common';
import {renderToNodeStream, renderToString} from 'react-dom/server';
import {DefaultRootState} from 'react-redux';
import {Writable} from 'stream';
import {AppService} from './app.service';
import {AppServer} from '../client/AppServer';
import {getStore} from '../client/store/store';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/_app_state_')
  setState(@Session() session: { state: DefaultRootState }, @Body() body: DefaultRootState) {
    if (session && Object.keys(body).length !== 0) session.state = body;
    else if (session) return session.state;
    else return {};
  }

  @Get('/*')
  dispatchPage(@Res() res: Writable, @Param() params: string, @Session() session: { state: DefaultRootState }, @Next() next: () => void): void {
    if (params[0].indexOf('.') < 0) {
      const store = getStore(session?.state);
      if (session) session.state = store.getState();
      res.write('<!DOCTYPE html>');
      renderToNodeStream(
        AppServer({title: params[0], location: `/${params[0]}`, store})
      ).pipe(res);
    } else next();
  }
}
