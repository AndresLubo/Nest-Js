import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      return {
        message: 'Ocurrió un error al mostrar las categorias',
        error: error.response,
      };
    }
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.categoriesService.findOne(id);
    } catch (error) {
      return {
        message: `Ocurrió un error al mostrar la categoria ${id}`,
        error: error.response,
      };
    }
  }

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(payload);
    } catch (error) {
      return { message: 'Error al crear la categoria', error: error.response };
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    try {
      return await this.categoriesService.update(id, payload);
    } catch (error) {
      return {
        message: `Error al actualizar ña categoria ${id}`,
        error: error.response,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.categoriesService.remove(id);
    } catch (error) {
      return {
        message: `Error al eliminar la categoria ${id}`,
        error: error.response,
      };
    }
  }
}
