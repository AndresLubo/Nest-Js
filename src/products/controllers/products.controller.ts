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
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return await this.productsService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('productId', ParseIntPipe) productId: number) {
    return await this.productsService.findOne(productId);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    try {
      return await this.productsService.create(payload);
    } catch (error) {
      return { message: 'Ocurrió un error al crear un producto', error };
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(id, payload);
    } catch (error) {
      return {
        message: 'Ocurrió un error al actualizar el producto',
        error: error.response,
      };
    }
  }

  @Put(':productId/category/:categoryId')
  async addCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    try {
      return await this.productsService.addCategory(productId, categoryId);
    } catch (error) {
      return {
        message: `Ocurrió un error al agregar la categoría ${categoryId} al producto ${productId}`,
        error: error.response,
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.productsService.remove(id);
      return { message: `Product id: ${id} delete` };
    } catch (error) {
      return { message: 'Ocurrió un error al eliminar un producto' };
    }
  }

  @Delete(':productId/category/:categoryId')
  async removeCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    try {
      return await this.productsService.removeCategory(productId, categoryId);
    } catch (error) {
      return {
        message: `Ocurrió un error al eliminar la categoría ${categoryId} del producto ${productId}`,
        error: error.response,
      };
    }
  }
}
