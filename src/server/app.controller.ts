import {Controller, Get, Header, Param} from '@nestjs/common';
import {AppService} from './app.service';
// import {join, resolve} from 'path';
// import * as fs from 'fs';
// import {Speedometer} from '../client/components/Speedometer/Speedometer';
// import {App} from '../client/App';
// import {renderToString} from 'react-dom/server';
// import {createElement} from 'react';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get('/render')
  // render(): string {
  //   // @ts-ignore
  //   const str = renderToString(createElement(App));
  //   return str;
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
