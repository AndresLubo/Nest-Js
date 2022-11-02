import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  nuevo(): object {
    return {
      message: 'Yo soy el endPoint nuevo',
    };
  }

  @Get('/ruta')
  ruta(): string {
    return 'Esto es una ruta';
  }
}
