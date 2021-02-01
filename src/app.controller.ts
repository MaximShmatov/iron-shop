import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get( '/get')
  getIndexPage() {
    return 'sdsdas' // fs.readFileSync('build/public/index.html', 'utf-8');
  }
}
