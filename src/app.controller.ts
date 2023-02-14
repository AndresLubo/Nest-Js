import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApikeyGuard } from './auth/guards/apikey/apikey.guard';

import { Public } from './auth/guards/decorators/public.decorator';

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/tasks-mongo')
  async getTasks() {
    return await this.appService.getTasksMongo();
  }

  @Get('nuevo')
  @Public()
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
