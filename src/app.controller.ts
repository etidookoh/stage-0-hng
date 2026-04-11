import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NameDto } from './classify.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/classify')
  getHello(@Query() name: NameDto){
    return this.appService.getHello(name);
  }
}
