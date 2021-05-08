import {Controller, Req, Res, Get, Header, Param, Body, Query, Post, Headers, HostParam} from '@nestjs/common';
import {AppService} from './app.service';
import {renderToNodeStream} from 'react-dom/server';
import {PageTpl} from '../client/templates/PageTpl';
import {StaticRouter} from 'react-router-dom';
import {App} from '../client/App';
import {Writable} from 'stream';
import {DefaultRootState, Provider} from 'react-redux';
import {rootReducer, store} from '../client/redux/store';
import {createStore, combineReducers} from '@reduxjs/toolkit';
import {StrictMode} from 'react';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('/*')
  // fetchPages(
  //   @Res() res: Writable,
  //   @Param() params: string,
  //   @Body() body: object,
  //   @Query('state') query: string,
  //   @Headers() headers: any,
  //   @HostParam() hostparam: any,
  // ): void {
  //   let store = createStore(combineReducers(rootReducer.reducer));
  //   if (body) {
  //     store = createStore(combineReducers(rootReducer.reducer), body as DefaultRootState)
  //   }
  //   const state = store.getState();
  //   // console.log(headers)
  //   // console.log(hostparam)
  //   // console.log(store.getState());
  //   renderToNodeStream(
  //     <PageTpl title={params[0]} state={JSON.stringify(state)}>
  //       <Provider store={store}>
  //         <StaticRouter location={`/${params[0]}`} context={{}}>
  //           <App/>
  //         </StaticRouter>
  //       </Provider>
  //     </PageTpl>
  //   ).pipe(res);
  // }

  @Get('/*')
  index(
    @Res() res: Writable,
    @Param() params: string,
    @Body() body: object,
    @Query() query: string,
    @Headers() headers: any,
    @HostParam() hostparam: any,
  ): void {
    let store = createStore(combineReducers(rootReducer.reducer));
    // if (query) {
    //   store = createStore(combineReducers(rootReducer.reducer), JSON.parse(query) as DefaultRootState)
    // }
    const state = store.getState();
    console.log(hostparam)
    console.log(res)
    //console.log(res)
    // console.log(store.getState());
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

  // @Get('/news')
  // news(@Res() res:any): void {
  //   renderToNodeStream(
  //     <StaticRouter location={'/news'} context={{}}>
  //       <PageTpl title={'News'}>
  //         <App/>
  //       </PageTpl>
  //     </StaticRouter>
  //   ).pipe(res);
  // }


  // @Get('/__webpack_hmr')
  // getHRM(): void {
  //   console.log('HRMHRM');
  // }

  // @Get('*.png')
  // @Header('Content-Type', 'image/apng')
  // @Header('Mime-Type', 'image/png')
  // getPublicImages(@Param('0') name: string) {
  //   const dir = resolve('build/public', name);
  //   return fs.readFileSync(`${dir}.png`, 'binary');
  // }
  //
  // @Get('*')
  // getPublicAssets(@Param('0') name: string) {
  //   const dir = resolve('build/public', name);
  //   console.log('sdadsas', name);
  //   if (name.indexOf('.') === -1) {
  //     return fs.readFileSync(`${dir}.html`, 'utf-8');
  //   } else return fs.readFileSync(dir, 'utf-8');
  // }
}
