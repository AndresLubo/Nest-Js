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

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll() {
    try {
      return await this.brandsService.findAll();
    } catch (error) {
      return {
        message: 'Ocurrió un error al mostrar las marcas',
        error: error.response,
      };
    }
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.brandsService.findOne(id);
    } catch (error) {
      return {
        message: `Ocurrió un error al mostrar la marca ${id}`,
        error: error.response,
      };
    }
  }

  @Post()
  async create(@Body() payload: CreateBrandDto) {
    try {
      return await this.brandsService.create(payload);
    } catch (error) {
      return {
        message: 'Ocurrió un error al crear la marca',
        error: error.response,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    try {
      return await this.brandsService.update(id, payload);
    } catch (error) {
      return {
        message: `Ocurrió un error al actualiza la marca ${id}`,
        error: error.response,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.brandsService.remove(id);
    } catch (error) {
      return {
        message: `Ocurrió un error al eliminar la marca ${id}`,
        error: error.response,
      };
    }
  }
}
