import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NameDto } from './classify.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('classify')
async classify(@Query('name') name: string) {
  if (!name || name.trim() === '') {
    throw new BadRequestException({
      status: 'error',
      message: 'Name is required',
    });
  }

  return this.appService.classifyName(name);
}
}
