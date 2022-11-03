import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  // ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

@Controller('products') // 👈 Route
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // return `product ${productId}`;
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() body: any) {
    return this.productService.create(body);
  }

  @Put(':id')
  update(@Body() body: any, @Param('id') id: string) {
    return this.productService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
