import { Controller, Get, Param } from '@nestjs/common';
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

  //! Recibiendo parametros
  @Get('products/:id')
  getProducts(@Param() params: any) {
    return params;
  }

  @Get('params/:id')
  params(@Param('id') id: string) {
    return {
      parametroId: id,
    };
  }

  @Get('categories/:categoryId/products/:productId')
  getCategories(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return {
      CategoryId: categoryId,
      ProductId: productId,
    };
  }
}
