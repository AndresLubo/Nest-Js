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

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async findAll() {
    try {
      return await this.customersService.findAll();
    } catch (error) {
      return {
        message: 'Error al mostrar todos los customers',
        error: error.response,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.customersService.findOne(id);
    } catch (error) {
      return {
        message: `Ocurrio un error al mostrar el usuario ${id}`,
        error: error.response,
      };
    }
  }

  @Post()
  async create(@Body() payload: CreateCustomerDto) {
    try {
      return await this.customersService.create(payload);
    } catch (error) {
      return {
        message: 'Ocurrió un error al crear el customer',
        error: error.response,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    try {
      return await this.customersService.update(id, payload);
    } catch (error) {
      return {
        message: `Ocurrió un error al actualizar al customer ${id}`,
        error: error.response,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.customersService.remove(id);
    } catch (error) {
      return {
        message: `Ocurrió un error al eliminar al customer ${id}`,
        error: error.response,
      };
    }
  }
}
