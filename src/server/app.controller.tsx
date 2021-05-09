import {Controller, Res, Get, Param, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {renderToNodeStream} from 'react-dom/server';
import {PageTpl} from '../client/templates/PageTpl';
import {StaticRouter} from 'react-router-dom';
import {App} from '../client/App';
import {Writable} from 'stream';
import {DefaultRootState, Provider} from 'react-redux';
import {rootReducer} from '../client/redux/store';
import {createStore, combineReducers} from '@reduxjs/toolkit';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/*.html')
  index(@Res() res: Writable, @Param() params: string, @Query('state') query: string): void {
    let store = createStore(combineReducers(rootReducer.reducer));
    if (query) {
      store = createStore(combineReducers(rootReducer.reducer), JSON.parse(query) as DefaultRootState)
    }
    const state = store.getState();
    try {
      renderToNodeStream(
        <PageTpl title={params[0]} state={JSON.stringify(state)}>
          <Provider store={store}>
            <StaticRouter location={`/${params[0]}`} context={{}}>
              <App/>
            </StaticRouter>
          </Provider>
        </PageTpl>
      ).pipe(res);
    } catch (err) {
      console.error(err);
    }
  }
}
